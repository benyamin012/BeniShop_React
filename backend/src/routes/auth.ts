import { createHash, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { Router, type RequestHandler, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
const router = Router();

const REFRESH_COOKIE = "benishop_refresh";
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const credentialsSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_.-]+$/),
  password: z.string().min(8).max(72),
});

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/auth",
};

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function createAccessToken(userId: string, username: string): string {
  return jwt.sign({ username }, env.ACCESS_TOKEN_SECRET, {
    subject: userId,
    expiresIn: "15m",
  });
}

async function createRefreshToken(userId: string): Promise<string> {
  const token = jwt.sign({ jti: randomUUID() }, env.REFRESH_TOKEN_SECRET, {
    subject: userId,
    expiresIn: "7d",
  });

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
    },
  });

  return token;
}

function readTokenPayload(token: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    return typeof payload === "string" ? null : payload;
  } catch {
    return null;
  }
}

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    ...cookieOptions,
    maxAge: REFRESH_TTL_MS,
  });
}

router.post("/register", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message:
          "Username must be 3–30 characters using letters, numbers, dots, underscores or hyphens. Password must be 8–72 characters.",
      },
    });
    return;
  }

  const username = parsed.data.username.toLowerCase();
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  try {
    const user = await prisma.user.create({
      data: { username, passwordHash },
      select: { id: true, username: true, createdAt: true },
    });

    res.status(201).json({
      message: "Account created successfully.",
      user,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        error: {
          code: "USERNAME_TAKEN",
          message: "This username is already in use.",
        },
      });
      return;
    }

    throw error;
  }
});

router.post("/login", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: "Enter a valid username and password.",
      },
    });
    return;
  }

  const username = parsed.data.username.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (
    !user ||
    !(await bcrypt.compare(parsed.data.password, user.passwordHash))
  ) {
    res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Username or password is incorrect.",
      },
    });
    return;
  }

  const accessToken = createAccessToken(user.id, user.username);
  const refreshToken = await createRefreshToken(user.id);

  setRefreshCookie(res, refreshToken);

  res.json({
    accessToken,
    user: {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    },
  });
});

router.post("/refresh", async (req, res) => {
  const token: string | undefined = req.cookies?.[REFRESH_COOKIE];

  if (!token) {
    res.status(401).json({
      error: { code: "MISSING_REFRESH_TOKEN", message: "Please log in again." },
    });
    return;
  }

  const payload = readTokenPayload(token);
  const tokenHash = hashToken(token);

  if (!payload?.sub) {
    res.clearCookie(REFRESH_COOKIE, cookieOptions);
    res.status(401).json({
      error: { code: "INVALID_REFRESH_TOKEN", message: "Please log in again." },
    });
    return;
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });

  if (
    !storedToken ||
    storedToken.userId !== payload.sub ||
    storedToken.revokedAt ||
    storedToken.expiresAt <= new Date()
  ) {
    res.clearCookie(REFRESH_COOKIE, cookieOptions);
    res.status(401).json({
      error: { code: "INVALID_REFRESH_TOKEN", message: "Please log in again." },
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, username: true },
  });

  if (!user) {
    res.clearCookie(REFRESH_COOKIE, cookieOptions);
    res.status(401).json({
      error: { code: "USER_NOT_FOUND", message: "Please log in again." },
    });
    return;
  }

  await prisma.refreshToken.update({
    where: { tokenHash },
    data: { revokedAt: new Date() },
  });

  const accessToken = createAccessToken(user.id, user.username);
  const refreshToken = await createRefreshToken(user.id);

  setRefreshCookie(res, refreshToken);

  res.json({ accessToken, user });
});

router.post("/logout", async (req, res) => {
  const token: string | undefined = req.cookies?.[REFRESH_COOKIE];

  if (token) {
    await prisma.refreshToken.updateMany({
      where: { tokenHash: hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  res.clearCookie(REFRESH_COOKIE, cookieOptions);
  res.status(200).json({ message: "Logged out successfully." });
});

const requireAuth: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Please log in." },
    });
    return;
  }

  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    if (typeof payload === "string" || !payload.sub) {
      throw new Error("Invalid access token payload");
    }

    res.locals.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({
      error: { code: "INVALID_ACCESS_TOKEN", message: "Please log in again." },
    });
  }
};

router.get("/me", requireAuth, async (_req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: res.locals.userId as string },
    select: { id: true, username: true, createdAt: true },
  });

  if (!user) {
    res.status(404).json({
      error: { code: "USER_NOT_FOUND", message: "User was not found." },
    });
    return;
  }

  res.json({ user });
});

export default router;

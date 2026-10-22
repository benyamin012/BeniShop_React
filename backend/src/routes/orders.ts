import { Prisma } from "@prisma/client";
import { Router, type RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { getUsdTomanRate } from "../services/exchangeRate.js";

const router = Router();
const TAX_USD = 7.35;
const MAX_ITEMS = 50;
const MAX_QUANTITY = 99;

const createOrderSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(5).max(40),
  nationalId: z.string().trim().max(30).optional().or(z.literal("")),
  address: z.string().trim().min(5).max(1000),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
  latitude: z.number().finite().min(-90).max(90),
  longitude: z.number().finite().min(-180).max(180),
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().min(1).max(MAX_QUANTITY),
      }),
    )
    .min(1)
    .max(MAX_ITEMS),
});

const optionalAuth: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") ?? [];

  if (!token && !authorization) {
    next();
    return;
  }

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({
      error: { code: "INVALID_AUTHORIZATION", message: "Invalid authorization header." },
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

router.post("/", optionalAuth, async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: {
        code: "INVALID_ORDER",
        message: "Check the delivery details, coordinates, and cart items.",
        details: parsed.error.flatten(),
      },
    });
    return;
  }

  const data = parsed.data;

  // Merge duplicate IDs so each product is priced and validated once.
  const quantities = new Map<number, number>();
  for (const item of data.items) {
    quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
  }

  for (const quantity of quantities.values()) {
    if (quantity > MAX_QUANTITY) {
      res.status(400).json({
        error: { code: "INVALID_QUANTITY", message: `Quantity cannot exceed ${MAX_QUANTITY} per product.` },
      });
      return;
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: [...quantities.keys()] },
      isActive: true,
      category: { isActive: true },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceIrr: true,
      priceUsd: true,
    },
  });

  if (products.length !== quantities.size) {
    res.status(400).json({
      error: {
        code: "PRODUCT_UNAVAILABLE",
        message: "One or more products are unavailable. Refresh your cart and try again.",
      },
    });
    return;
  }

  const usdTomanRate = await getUsdTomanRate();
  const orderItems = products.map((product) => {
    const quantity = quantities.get(product.id)!;
    const priceIrr = new Prisma.Decimal(product.priceIrr);
    const unitPriceUsd =
      usdTomanRate && Number(usdTomanRate) > 0
        ? priceIrr.div(usdTomanRate).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP)
        : product.priceUsd;

    if (unitPriceUsd === null || !unitPriceUsd.isFinite() || unitPriceUsd.lessThan(0)) {
      throw new Error("USD pricing is unavailable for one or more products.");
    }

    return {
      productId: product.id,
      productName: product.name,
      productImageUrl: product.imageUrl,
      quantity,
      unitPriceUsd,
      unitPriceIrr: priceIrr,
      lineTotalUsd: unitPriceUsd.mul(quantity).toDecimalPlaces(2),
    };
  });

  const subtotalUsd = orderItems.reduce(
    (sum, item) => sum.plus(item.lineTotalUsd),
    new Prisma.Decimal(0),
  ).toDecimalPlaces(2);
  const taxUsd = new Prisma.Decimal(TAX_USD);
  const shippingUsd = new Prisma.Decimal(0);
  const totalUsd = subtotalUsd.plus(taxUsd).plus(shippingUsd).toDecimalPlaces(2);

  const userId = res.locals.userId as string | undefined;
  if (userId) {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!userExists) {
      res.status(401).json({
        error: { code: "INVALID_ACCESS_TOKEN", message: "Please log in again." },
      });
      return;
    }
  }

  const order = await prisma.order.create({
    data: {
      userId: userId ?? null,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      nationalId: data.nationalId || null,
      address: data.address,
      notes: data.notes || null,
      latitude: data.latitude,
      longitude: data.longitude,
      subtotalUsd,
      taxUsd,
      shippingUsd,
      totalUsd,
      items: { create: orderItems },
    },
    include: { items: true },
  });

  res.status(201).json({
    message: "Order created successfully.",
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      currency: order.currency,
      subtotalUsd: Number(order.subtotalUsd),
      taxUsd: Number(order.taxUsd),
      shippingUsd: Number(order.shippingUsd),
      totalUsd: Number(order.totalUsd),
      createdAt: order.createdAt,
      delivery: {
        fullName: order.fullName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        latitude: order.latitude,
        longitude: order.longitude,
      },
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPriceUsd: Number(item.unitPriceUsd),
        lineTotalUsd: Number(item.lineTotalUsd),
      })),
    },
  });
});

export default router;

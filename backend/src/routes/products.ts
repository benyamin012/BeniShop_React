import { Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { getUsdTomanRate } from "../services/exchangeRate.js";
const router = Router();

const listQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  category: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
  sort: z
    .enum(["newest", "price-asc", "price-desc", "rating"])
    .default("newest"),
});

function serializeProduct(
  product: {
    id: number;
    name: string;
    persianName: string | null;
    description: string | null;
    descriptionFa: string | null;
    imageUrl: string | null;
    priceIrr: Prisma.Decimal;
    priceUsd: Prisma.Decimal | null;

    stock: number;
    discountPercent: number;
    rating: number;
    ratingCount: number;
    attributes: Prisma.JsonValue;
    attributesFa: Prisma.JsonValue;
    categoryId: number;
    category: {
      id: number;
      name: string;
      persianName: string | null;
      slug: string;
    };
  },
  usdTomanRate: number | null,
) {
  const price = Number(product.priceIrr);

  const priceUsd =
    usdTomanRate !== null && price > 0
      ? Math.round((price / usdTomanRate) * 100) / 100
      : product.priceUsd == null
        ? null
        : Number(product.priceUsd);
  const attributes =
    product.attributes &&
    typeof product.attributes === "object" &&
    !Array.isArray(product.attributes)
      ? product.attributes
      : {};

  return {
    id: product.id,
    // Compatibility fields: existing React components expect Fake Store API's shape.
    title: product.name,
    price,
    priceIrr: price,
    priceUsd,
    usdTomanRate,
    image: product.imageUrl ?? "",
    description: product.description ?? "",
    descriptionFa: product.descriptionFa ?? "",
    category: product.category.name,
    rating: {
      rate: product.rating,
      count: product.ratingCount,
    },
    // Canonical fields for future features and the existing Persian catalog.
    name: product.name,
    fname: product.persianName,
    img: product.imageUrl,
    Amount: price,
    PriceUSD: priceUsd,
    attributesFa: product.attributesFa,
    stock: product.stock,
    Discount: product.discountPercent ? `${product.discountPercent}%` : "0%",
    Comments: product.ratingCount,
    categoryId: product.categoryId,
    categoryInfo: product.category,
    ...attributes,
  };
}

const productInclude = {
  category: {
    select: { id: true, name: true, persianName: true, slug: true },
  },
} satisfies Prisma.ProductInclude;

router.get("/", async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({
      error: {
        code: "INVALID_QUERY",
        message: "Invalid product filters or pagination parameters.",
        details: parsed.error.flatten(),
      },
    });
    return;
  }

  const { q, categoryId, category, page, limit, sort } = parsed.data;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(categoryId ? { categoryId } : {}),
    ...(category
      ? {
          category: {
            isActive: true,
            OR: [
              { slug: { equals: category, mode: "insensitive" } },
              { name: { equals: category, mode: "insensitive" } },
              { persianName: { equals: category, mode: "insensitive" } },
            ],
          },
        }
      : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { persianName: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price-asc"
      ? { priceIrr: "asc" }
      : sort === "price-desc"
        ? { priceIrr: "desc" }
        : sort === "rating"
          ? { rating: "desc" }
          : { createdAt: "desc" };

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: productInclude,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  const usdTomanRate = await getUsdTomanRate();

  // The default response is an array so the current product grid can switch
  // from Fake Store API without changing its data-mapping code.
  res.setHeader("X-Total-Count", String(total));
  res.setHeader("X-Page", String(page));
  res.setHeader("X-Page-Size", String(limit));
  res.setHeader("X-Total-Pages", String(Math.ceil(total / limit)));
  res.json(products.map((product) => serializeProduct(product, usdTomanRate)));
});

router.get("/categories", async (_req, res) => {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ parentId: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      persianName: true,
      slug: true,
      parentId: true,
      _count: { select: { products: { where: { isActive: true } } } },
    },
  });

  res.json(
    categories.map((category) => ({
      id: category.id,
      name: category.name,
      faName: category.persianName,
      enName: category.name,
      slug: category.slug,
      parentId: category.parentId,
      productCount: category._count.products,
    })),
  );
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({
      error: {
        code: "INVALID_PRODUCT_ID",
        message: "Product ID must be a positive integer.",
      },
    });
    return;
  }

  const product = await prisma.product.findFirst({
    where: { id, isActive: true, category: { isActive: true } },
    include: productInclude,
  });

  if (!product) {
    res.status(404).json({
      error: { code: "PRODUCT_NOT_FOUND", message: "Product was not found." },
    });
    return;
  }

  const usdTomanRate = await getUsdTomanRate();

  res.json(serializeProduct(product, usdTomanRate));
});

export default router;

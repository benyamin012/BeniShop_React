import { Prisma, PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(currentDir, "../../public/Data/data.json");

type SourceCategory = {
  id: number;
  parentId: number;
  enName: string;
  faName: string;
};

type SourceProduct = {
  id: number;
  name: string;
  fname?: string;
  img?: string;
  categoryId: number;
  Amount: number;
  stock?: number;
  Discount?: string;
  Comments?: number;
  rating?: number;
  [key: string]: unknown;
};

type Catalog = {
  sellWhat: Array<{ childern: SourceCategory[] }>;
  product: SourceProduct[];
};

function toSlug(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const raw = await readFile(catalogPath, "utf8");
  const catalog = JSON.parse(raw) as Catalog;
  const categories = catalog.sellWhat.flatMap((group) => group.childern);
  const categoryIds = new Set(categories.map((category) => category.id));

  for (const category of categories) {
    if (category.parentId !== 0 && !categoryIds.has(category.parentId)) {
      throw new Error(
        `Category ${category.id} references missing parent ${category.parentId}`,
      );
    }
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.enName,
        persianName: category.faName,
        slug: `${toSlug(category.enName)}-${category.id}`,
        parentId: category.parentId === 0 ? null : category.parentId,
        isActive: true,
      },
      create: {
        id: category.id,
        name: category.enName,
        persianName: category.faName,
        slug: `${toSlug(category.enName)}-${category.id}`,
        parentId: category.parentId === 0 ? null : category.parentId,
      },
    });
  }

  for (const product of catalog.product) {
    if (!categoryIds.has(product.categoryId)) {
      throw new Error(
        `Product ${product.id} references missing category ${product.categoryId}`,
      );
    }

    const attributes = Object.fromEntries(
      Object.entries(product).filter(
        ([key]) =>
          ![
            "id",
            "name",
            "fname",
            "img",
            "categoryId",
            "Amount",
            "stock",
            "Discount",
            "Comments",
            "rating",
          ].includes(key),
      ),
    ) as Prisma.InputJsonObject;

    const discountMatch = product.Discount?.match(/\d+(?:\.\d+)?/);
    const discountPercent = discountMatch ? Number(discountMatch[0]) : 0;

    const data = {
      name: product.name,
      persianName: product.fname ?? null,
      description: null,
      imageUrl: product.img ?? null,
      price: BigInt(Math.round(product.Amount)).toString(),
      stock: Math.max(0, Math.trunc(product.stock ?? 0)),
      discountPercent: Math.min(100, Math.max(0, Math.trunc(discountPercent))),
      rating: Math.min(5, Math.max(0, product.rating ?? 0)),
      ratingCount: Math.max(0, Math.trunc(product.Comments ?? 0)),
      attributes,
      categoryId: product.categoryId,
      isActive: true,
    };

    await prisma.product.upsert({
      where: { id: product.id },
      update: data,
      create: { id: product.id, ...data },
    });
  }

  // Keep generated IDs above the imported IDs so future admin-created records
  // cannot collide with the catalog IDs.
  await prisma.$executeRawUnsafe(
    'SELECT setval(pg_get_serial_sequence(\'"categories"\', \'id\'), GREATEST((SELECT COALESCE(MAX("id"), 1) FROM "categories"), 1))',
  );
  await prisma.$executeRawUnsafe(
    'SELECT setval(pg_get_serial_sequence(\'"products"\', \'id\'), GREATEST((SELECT COALESCE(MAX("id"), 1) FROM "products"), 1))',
  );

  console.log(
    `Seeded ${categories.length} categories and ${catalog.product.length} products.`,
  );
}

main()
  .catch((error) => {
    console.error("Product seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

-- Add bilingual product descriptions/specifications and a separate international price.
ALTER TABLE "products"
  ADD COLUMN "descriptionFa" TEXT,
  ADD COLUMN "priceUsd" DECIMAL(12, 2),
  ADD COLUMN "attributesFa" JSONB NOT NULL DEFAULT '{}'::jsonb;

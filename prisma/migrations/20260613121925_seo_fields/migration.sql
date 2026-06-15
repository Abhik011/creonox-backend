/*
  Warnings:

  - You are about to drop the column `keywords` on the `Insight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "keywords",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seoKeywords" JSONB;

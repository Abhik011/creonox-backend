/*
  Warnings:

  - Added the required column `key` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "key" TEXT NOT NULL;

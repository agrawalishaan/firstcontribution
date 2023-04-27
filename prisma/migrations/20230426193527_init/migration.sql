/*
  Warnings:

  - Changed the type of `labels` on the `Issue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "labels",
ADD COLUMN     "labels" BOOLEAN NOT NULL;

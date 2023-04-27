/*
  Warnings:

  - Changed the type of `pullRequest` on the `Issue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "pullRequest",
ADD COLUMN     "pullRequest" BOOLEAN NOT NULL;

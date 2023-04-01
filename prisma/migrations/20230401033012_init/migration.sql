/*
  Warnings:

  - A unique constraint covering the columns `[repoId]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repoId` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `homepage` on table `Repository` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE repository_id_seq;
ALTER TABLE "Repository" ADD COLUMN     "repoId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('repository_id_seq'),
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "homepage" SET NOT NULL;
ALTER SEQUENCE repository_id_seq OWNED BY "Repository"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Repository_repoId_key" ON "Repository"("repoId");

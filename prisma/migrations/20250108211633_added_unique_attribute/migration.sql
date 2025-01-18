/*
  Warnings:

  - You are about to drop the column `Tag` on the `Resources` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Resources` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Resources" DROP COLUMN "Tag",
ADD COLUMN     "tag" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Resources_title_key" ON "Resources"("title");

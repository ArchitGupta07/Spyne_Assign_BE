/*
  Warnings:

  - You are about to drop the column `carId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_carId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "carId";

-- CreateTable
CREATE TABLE "_CarTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarTags_AB_unique" ON "_CarTags"("A", "B");

-- CreateIndex
CREATE INDEX "_CarTags_B_index" ON "_CarTags"("B");

-- AddForeignKey
ALTER TABLE "_CarTags" ADD CONSTRAINT "_CarTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarTags" ADD CONSTRAINT "_CarTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

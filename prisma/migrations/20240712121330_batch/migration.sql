/*
  Warnings:

  - You are about to drop the column `centerId` on the `BatchSchedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BatchSchedules` DROP COLUMN `centerId`;

-- AlterTable
ALTER TABLE `Batches` MODIFY `coachId` INTEGER NULL;

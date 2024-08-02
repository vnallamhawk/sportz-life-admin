/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Coaches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Coaches` DROP FOREIGN KEY `CoachesAdmin_ibfk_1`;

-- AlterTable
ALTER TABLE `Coaches` DROP COLUMN `createdBy`;

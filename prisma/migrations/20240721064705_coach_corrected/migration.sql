/*
  Warnings:

  - You are about to drop the column `centerId` on the `Coaches` table. All the data in the column will be lost.
  - You are about to drop the column `experienceLevel` on the `Coaches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Coaches` DROP FOREIGN KEY `Coaches_ibfk_642`;

-- AlterTable
ALTER TABLE `Coaches` DROP COLUMN `centerId`,
    DROP COLUMN `experienceLevel`;

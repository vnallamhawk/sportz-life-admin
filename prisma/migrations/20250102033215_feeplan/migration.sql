/*
  Warnings:

  - You are about to drop the column `isLateAmount` on the `FeePlans` table. All the data in the column will be lost.
  - You are about to drop the column `isLateType` on the `FeePlans` table. All the data in the column will be lost.
  - Added the required column `currency` to the `FeePlans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FeePlans` DROP COLUMN `isLateAmount`,
    DROP COLUMN `isLateType`,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `lateFee` FLOAT NULL,
    ADD COLUMN `lateFeeType` ENUM('amount', 'percentage') NULL;

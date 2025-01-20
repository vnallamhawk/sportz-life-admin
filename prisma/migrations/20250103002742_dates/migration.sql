/*
  Warnings:

  - Added the required column `createdAt` to the `FeePlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FeePlans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FeePlans` ADD COLUMN `createdAt` DATETIME(0) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(0) NOT NULL;

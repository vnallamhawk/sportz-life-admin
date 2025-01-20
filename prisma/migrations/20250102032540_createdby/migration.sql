/*
  Warnings:

  - Added the required column `createdBy` to the `FeePlans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FeePlans` ADD COLUMN `createdBy` INTEGER NOT NULL;

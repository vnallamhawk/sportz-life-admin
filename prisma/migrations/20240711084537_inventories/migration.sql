/*
  Warnings:

  - Added the required column `category` to the `Inventories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Inventories` ADD COLUMN `category` VARCHAR(255) NOT NULL;

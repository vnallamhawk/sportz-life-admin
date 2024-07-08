/*
  Warnings:

  - You are about to drop the column `address` on the `Inventories` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Inventories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Inventories` DROP COLUMN `address`,
    DROP COLUMN `mobile`;

/*
  Warnings:

  - Made the column `status` on table `FeePlans` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `FeePlans` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

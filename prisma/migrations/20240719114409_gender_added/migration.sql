/*
  Warnings:

  - Added the required column `gender` to the `Staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Staffs` ADD COLUMN `gender` ENUM('male', 'female') NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Centers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Centers` ADD COLUMN `email` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `Centers`(`email`);

/*
  Warnings:

  - Added the required column `endTime` to the `StaffShifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `StaffShifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StaffShifts` ADD COLUMN `endTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` VARCHAR(191) NOT NULL;

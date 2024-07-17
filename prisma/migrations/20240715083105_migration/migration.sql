/*
  Warnings:

  - Added the required column `age` to the `Staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerId` to the `Staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `staffs` ADD COLUMN `age` VARCHAR(10) NOT NULL,
    ADD COLUMN `centerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Staffs` ADD CONSTRAINT `StaffCenterMap_ibfk_517` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

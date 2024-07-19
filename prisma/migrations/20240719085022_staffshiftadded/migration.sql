/*
  Warnings:

  - You are about to drop the column `age` on the `Staffs` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `Staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Staffs` DROP COLUMN `age`,
    ADD COLUMN `dateOfBirth` DATE NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(0) NULL;

-- CreateTable
CREATE TABLE `StaffShifts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staffId` INTEGER NOT NULL,
    `day` VARCHAR(255) NOT NULL,
    `shift` VARCHAR(255) NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(0) NULL,

    INDEX `staffId`(`staffId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StaffShifts` ADD CONSTRAINT `StaffShidtsMaps_ibfk_517` FOREIGN KEY (`staffId`) REFERENCES `Staffs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

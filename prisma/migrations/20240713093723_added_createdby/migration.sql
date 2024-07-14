/*
  Warnings:

  - You are about to drop the column `academyId` on the `Centers` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Centers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Coaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Inventories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Sports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designationId` to the `Staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payrollId` to the `Staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Centers` DROP COLUMN `academyId`,
    ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Coaches` ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Inventories` ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Sports` ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Staffs` ADD COLUMN `createdBy` INTEGER NOT NULL,
    ADD COLUMN `designationId` INTEGER NOT NULL,
    ADD COLUMN `payrollId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `StaffDesignation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `designation` VARCHAR(255) NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(0) NULL,
    `createdBy` INTEGER NOT NULL,

    INDEX `createdBy`(`createdBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffPayroll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxable` BOOLEAN NOT NULL DEFAULT false,
    `grossSalary` DOUBLE NOT NULL,
    `slabId` INTEGER NULL,
    `designationId` INTEGER NOT NULL,
    `tax_percent` INTEGER NOT NULL,
    `netSalary` DOUBLE NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(0) NULL,
    `createdBy` INTEGER NOT NULL,

    INDEX `createdBy`(`createdBy`),
    INDEX `designationId`(`designationId`),
    INDEX `slabId`(`slabId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaxSlabs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromAmount` INTEGER NOT NULL,
    `toAmount` INTEGER NOT NULL,
    `percentage` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(0) NULL,
    `createdBy` INTEGER NOT NULL,

    INDEX `createdBy`(`createdBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `createdBy` ON `Centers`(`createdBy`);

-- CreateIndex
CREATE INDEX `createdBy` ON `Coaches`(`createdBy`);

-- CreateIndex
CREATE INDEX `createdBy` ON `Inventories`(`createdBy`);

-- CreateIndex
CREATE INDEX `createdBy` ON `Sports`(`createdBy`);

-- CreateIndex
CREATE INDEX `createdBy` ON `Staffs`(`createdBy`);

-- CreateIndex
CREATE INDEX `designationId` ON `Staffs`(`designationId`);

-- CreateIndex
CREATE INDEX `payrollId` ON `Staffs`(`payrollId`);

-- AddForeignKey
ALTER TABLE `Centers` ADD CONSTRAINT `CenterAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventories` ADD CONSTRAINT `InventoryAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coaches` ADD CONSTRAINT `CoachesAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sports` ADD CONSTRAINT `SportsAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staffs` ADD CONSTRAINT `StaffDesignationMaps_ibfk_517` FOREIGN KEY (`designationId`) REFERENCES `StaffDesignation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staffs` ADD CONSTRAINT `StaffPayrollMaps_ibfk_517` FOREIGN KEY (`payrollId`) REFERENCES `StaffPayroll`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staffs` ADD CONSTRAINT `StaffsAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffDesignation` ADD CONSTRAINT `StaffDesignationAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffPayroll` ADD CONSTRAINT `StaffDesignationPayrol_ibfk_1` FOREIGN KEY (`designationId`) REFERENCES `StaffDesignation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffPayroll` ADD CONSTRAINT `PayrollSlabMaps_ibfk_517` FOREIGN KEY (`slabId`) REFERENCES `TaxSlabs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffPayroll` ADD CONSTRAINT `StaffPayrollAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxSlabs` ADD CONSTRAINT `TaxSlabAdmin_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

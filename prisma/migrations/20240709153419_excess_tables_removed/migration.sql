/*
  Warnings:

  - You are about to drop the column `centerId` on the `Inventories` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Inventories` table. All the data in the column will be lost.
  - You are about to drop the `CoachOnCenters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachOnCentersBatches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CoachOnCenters` DROP FOREIGN KEY `CoachOnCenters_ibfk_21`;

-- DropForeignKey
ALTER TABLE `CoachOnCenters` DROP FOREIGN KEY `CoachOnCenters_ibfk_22`;

-- DropForeignKey
ALTER TABLE `CoachOnCenters` DROP FOREIGN KEY `CoachOnCenters_ibfk_3`;

-- DropForeignKey
ALTER TABLE `CoachOnCenters` DROP FOREIGN KEY `CoachOnCenters_ibfk_4`;

-- DropForeignKey
ALTER TABLE `CoachOnCentersBatches` DROP FOREIGN KEY `CoachOnCentersBatches_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CoachOnCentersBatches` DROP FOREIGN KEY `CoachOnCentersBatches_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Inventories` DROP FOREIGN KEY `Inventories_ibfk_1`;

-- DropIndex
DROP INDEX `academyId` ON `Centers`;

-- DropIndex
DROP INDEX `academyId` ON `Coaches`;

-- AlterTable
ALTER TABLE `Inventories` DROP COLUMN `centerId`,
    DROP COLUMN `quantity`;

-- DropTable
DROP TABLE `CoachOnCenters`;

-- DropTable
DROP TABLE `CoachOnCentersBatches`;

-- CreateTable
CREATE TABLE `CenterInventories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,
    `inventoryId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `centerId`(`centerId`),
    INDEX `inventoryId`(`inventoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CenterInventories` ADD CONSTRAINT `CenterInventories_ibfk_1` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CenterInventories` ADD CONSTRAINT `CenterInventories_ibfk_2` FOREIGN KEY (`inventoryId`) REFERENCES `Inventories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

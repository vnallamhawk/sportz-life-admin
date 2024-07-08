/*
  Warnings:

  - You are about to drop the column `academyId` on the `Assessments` table. All the data in the column will be lost.
  - You are about to drop the column `academyCode` on the `Athletes` table. All the data in the column will be lost.
  - You are about to drop the column `academyId` on the `Batches` table. All the data in the column will be lost.
  - You are about to drop the column `academyId` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the `Academies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AcademySportsMaps` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `centerId` to the `Assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerId` to the `Athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerId` to the `BatchSchedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerId` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerId` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AcademySportsMaps` DROP FOREIGN KEY `AcademySportsMaps_ibfk_795`;

-- DropForeignKey
ALTER TABLE `AcademySportsMaps` DROP FOREIGN KEY `AcademySportsMaps_ibfk_796`;

-- DropForeignKey
ALTER TABLE `Assessments` DROP FOREIGN KEY `Assessments_ibfk_207`;

-- DropForeignKey
ALTER TABLE `Athletes` DROP FOREIGN KEY `Athletes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Batches` DROP FOREIGN KEY `Batches_ibfk_1341`;

-- DropForeignKey
ALTER TABLE `Centers` DROP FOREIGN KEY `Centers_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Coaches` DROP FOREIGN KEY `Coaches_ibfk_641`;

-- DropForeignKey
ALTER TABLE `Tests` DROP FOREIGN KEY `Tests_ibfk_1148`;

-- AlterTable
ALTER TABLE `Assessments` DROP COLUMN `academyId`,
    ADD COLUMN `centerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Athletes` DROP COLUMN `academyCode`,
    ADD COLUMN `centerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `BatchSchedules` ADD COLUMN `centerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Batches` DROP COLUMN `academyId`,
    ADD COLUMN `centerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tests` DROP COLUMN `academyId`,
    ADD COLUMN `centerId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Academies`;

-- DropTable
DROP TABLE `AcademySportsMaps`;

-- CreateTable
CREATE TABLE `CenterSports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sportId` INTEGER NULL,
    `centerId` INTEGER NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `id`(`id`),
    INDEX `centerId`(`centerId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `centerId` ON `Assessments`(`centerId`);

-- CreateIndex
CREATE INDEX `centerId` ON `Athletes`(`centerId`);

-- CreateIndex
CREATE INDEX `centerId` ON `Batches`(`centerId`);

-- CreateIndex
CREATE INDEX `centerId` ON `Tests`(`centerId`);

-- AddForeignKey
ALTER TABLE `CenterSports` ADD CONSTRAINT `CenterSportsMaps_ibfk_795` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CenterSports` ADD CONSTRAINT `CenterSportsMaps_ibfk_796` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_ibfk_207` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athletes` ADD CONSTRAINT `Athletes_ibfk_1` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batches` ADD CONSTRAINT `Batches_ibfk_1344` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tests` ADD CONSTRAINT `Tests_ibfk_1148` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

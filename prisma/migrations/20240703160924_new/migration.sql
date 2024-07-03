/*
  Warnings:

  - You are about to drop the column `centerId` on the `Batches` table. All the data in the column will be lost.
  - You are about to drop the column `sub_title` on the `Sports` table. All the data in the column will be lost.
  - You are about to drop the `BatchDays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BodyParts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Center` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Certificates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachesOnBatches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachesOnCenters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachesOnSports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InjuryLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SportUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SportsOnCenters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffCenter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `academyId` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coachId` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupiedSeat` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remainingSeat` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `Sports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Sports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTitle` to the `Sports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Batches` DROP FOREIGN KEY `Batches_centerId_fkey`;

-- DropForeignKey
ALTER TABLE `Certificates` DROP FOREIGN KEY `Certificates_coachId_fkey`;

-- DropForeignKey
ALTER TABLE `CoachesOnBatches` DROP FOREIGN KEY `CoachesOnBatches_batchId_fkey`;

-- DropForeignKey
ALTER TABLE `CoachesOnBatches` DROP FOREIGN KEY `CoachesOnBatches_coachId_fkey`;

-- DropForeignKey
ALTER TABLE `CoachesOnCenters` DROP FOREIGN KEY `CoachesOnCenters_centerId_fkey`;

-- DropForeignKey
ALTER TABLE `CoachesOnCenters` DROP FOREIGN KEY `CoachesOnCenters_coachId_fkey`;

-- DropForeignKey
ALTER TABLE `CoachesOnSports` DROP FOREIGN KEY `CoachesOnSports_coachId_fkey`;

-- DropForeignKey
ALTER TABLE `CoachesOnSports` DROP FOREIGN KEY `CoachesOnSports_sportId_fkey`;

-- DropForeignKey
ALTER TABLE `Inventory` DROP FOREIGN KEY `Inventory_centerId_fkey`;

-- DropForeignKey
ALTER TABLE `Payroll` DROP FOREIGN KEY `Payroll_coachId_fkey`;

-- DropForeignKey
ALTER TABLE `Payroll` DROP FOREIGN KEY `Payroll_staffId_fkey`;

-- DropForeignKey
ALTER TABLE `Shift` DROP FOREIGN KEY `Shift_staffId_fkey`;

-- DropForeignKey
ALTER TABLE `SportsOnCenters` DROP FOREIGN KEY `SportsOnCenters_centerId_fkey`;

-- DropForeignKey
ALTER TABLE `SportsOnCenters` DROP FOREIGN KEY `SportsOnCenters_sportId_fkey`;

-- DropForeignKey
ALTER TABLE `StaffCenter` DROP FOREIGN KEY `StaffCenter_centerId_fkey`;

-- DropForeignKey
ALTER TABLE `StaffCenter` DROP FOREIGN KEY `StaffCenter_staffId_fkey`;

-- DropIndex
DROP INDEX `Sports_name_key` ON `Sports`;

-- AlterTable
ALTER TABLE `Batches` DROP COLUMN `centerId`,
    ADD COLUMN `academyId` INTEGER NOT NULL,
    ADD COLUMN `capacity` INTEGER NOT NULL,
    ADD COLUMN `coachId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(0) NOT NULL,
    ADD COLUMN `occupiedSeat` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `remainingSeat` INTEGER NOT NULL,
    ADD COLUMN `sportId` INTEGER NOT NULL,
    ADD COLUMN `status` TINYINT NULL DEFAULT 1,
    ADD COLUMN `updatedAt` DATETIME(0) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Sports` DROP COLUMN `sub_title`,
    ADD COLUMN `about` TEXT NOT NULL,
    ADD COLUMN `createdAt` DATETIME(0) NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(0) NULL,
    ADD COLUMN `icon` VARCHAR(255) NULL,
    ADD COLUMN `image` VARCHAR(255) NULL,
    ADD COLUMN `status` TINYINT NULL DEFAULT 1,
    ADD COLUMN `subTitle` VARCHAR(255) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(0) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `BatchDays`;

-- DropTable
DROP TABLE `BodyParts`;

-- DropTable
DROP TABLE `Center`;

-- DropTable
DROP TABLE `Certificates`;

-- DropTable
DROP TABLE `Coach`;

-- DropTable
DROP TABLE `CoachesOnBatches`;

-- DropTable
DROP TABLE `CoachesOnCenters`;

-- DropTable
DROP TABLE `CoachesOnSports`;

-- DropTable
DROP TABLE `InjuryLog`;

-- DropTable
DROP TABLE `Inventory`;

-- DropTable
DROP TABLE `Payroll`;

-- DropTable
DROP TABLE `Shift`;

-- DropTable
DROP TABLE `SportUser`;

-- DropTable
DROP TABLE `SportsOnCenters`;

-- DropTable
DROP TABLE `Staff`;

-- DropTable
DROP TABLE `StaffCenter`;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `Academies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademySportsMaps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sportId` INTEGER NULL,
    `academyId` INTEGER NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `academyId`(`academyId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentAssignedAthletes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `assessmentId` INTEGER NOT NULL,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `athleteId`(`athleteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentAssignedCoaches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coachId` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `assessmentId` INTEGER NOT NULL,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `coachId`(`coachId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentBatches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `batchId`(`batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentCenterBatches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentCenterId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assessmentCenterId`(`assessmentCenterId`),
    INDEX `batchId`(`batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentCenterSports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentCenterId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assessmentCenterId`(`assessmentCenterId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentCenters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `centerId`(`centerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentResults` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `assessmentId` INTEGER NOT NULL,
    `assignedTestId` INTEGER NOT NULL,
    `score` FLOAT NULL DEFAULT 0,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `date` DATETIME(0) NULL,
    `strength` VARCHAR(255) NULL,
    `weakness` VARCHAR(255) NULL,
    `comment` VARCHAR(255) NULL,
    `coachId` INTEGER NOT NULL,
    `isSubmitted` BOOLEAN NULL DEFAULT false,
    `isPresent` BOOLEAN NULL DEFAULT true,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `assignedTestId`(`assignedTestId`),
    INDEX `athleteId`(`athleteId`),
    INDEX `coachId`(`coachId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentSports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assessments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `academyId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `level` ENUM('beginner', 'intermediate', 'advanced', 'developer') NOT NULL,
    `mode` ENUM('recurring', 'one time') NOT NULL,
    `interval` ENUM('weekly', 'monthly') NOT NULL,
    `isAthleteAssess` BOOLEAN NULL,
    `isCoachAssess` BOOLEAN NULL,
    `isStrengthAdded` BOOLEAN NULL,
    `isWeaknessAdded` BOOLEAN NULL,
    `isCommentsAdded` BOOLEAN NULL,
    `assessmentStatus` ENUM('ongoing', 'completed', 'upcoming') NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `academyId`(`academyId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignedTestBanks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentId` INTEGER NOT NULL,
    `testBankId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assessmentId`(`assessmentId`),
    INDEX `testBankId`(`testBankId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignedTests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignedTestBankId` INTEGER NOT NULL,
    `testId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `assignedTestBankId`(`assignedTestBankId`),
    INDEX `testId`(`testId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AthleteAttendances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `attendance` ENUM('present', 'absent', 'rest day', 'cancelled', 'not marked') NULL DEFAULT 'present',
    `date` DATE NOT NULL,
    `time` TIME(0) NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `athleteId`(`athleteId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AthleteBatchesMaps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `athleteId`(`athleteId`),
    INDEX `batchId`(`batchId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AthleteSportsMaps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `sportsId` INTEGER NOT NULL,
    `trainingLevel` ENUM('beginner', 'intermediate', 'advanced', 'developer') NOT NULL,
    `centerId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `athleteId`(`athleteId`),
    INDEX `batchId`(`batchId`),
    INDEX `centerId`(`centerId`),
    INDEX `sportsId`(`sportsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Athletes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `dob` DATE NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `bloodGroup` ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    `height` FLOAT NOT NULL,
    `heightUnit` ENUM('cm', 'feet') NOT NULL,
    `weight` FLOAT NOT NULL,
    `weightUnit` ENUM('kg', 'pounds') NOT NULL,
    `fatherName` VARCHAR(255) NOT NULL,
    `countryCode` VARCHAR(255) NULL DEFAULT '+91',
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `academyCode` INTEGER NOT NULL,
    `medicalHistory` JSON NULL,
    `joiningDate` DATE NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    INDEX `academyCode`(`academyCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BatchSchedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `batchId` INTEGER NOT NULL,
    `day` ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun') NOT NULL,
    `startTime` TIME(0) NOT NULL,
    `endTime` TIME(0) NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `batchId`(`batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Centers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` INTEGER NULL,
    `address` TEXT NOT NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `academyId` INTEGER NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `academyId`(`academyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachSportsMaps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coachId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `coachId`(`coachId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coaches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `academyId` INTEGER NOT NULL,
    `image` VARCHAR(255) NULL,
    `designation` VARCHAR(255) NOT NULL,
    `experience` VARCHAR(255) NOT NULL,
    `trainingLevel` ENUM('beginner', 'intermediate', 'advanced', 'developer') NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `dateOfBirth` DATE NOT NULL,
    `countryCode` VARCHAR(255) NOT NULL DEFAULT '+91',
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `about` TEXT NOT NULL,
    `payrollId` INTEGER NULL,
    `experienceLevel` ENUM('zero_one', 'two_five', 'six_ten', 'ten_over') NOT NULL,
    `centerId` INTEGER NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    INDEX `academyId`(`academyId`),
    INDEX `centerId`(`centerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feeds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `staffId` INTEGER NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `staffId`(`staffId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HideFeeds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feedId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `userType` ENUM('athlete', 'coach', 'both_exist') NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InjuryImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `injuryId` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `injuryId`(`injuryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InjuryLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,
    `bodyPart` ENUM('upper body', 'middle body', 'lower body') NOT NULL,
    `bodyPartName` ENUM('head', 'neck', 'left shoulder', 'right shoulder', 'chest', 'upper back', 'left elbow', 'right elbow', 'left wrist', 'right wrist', 'left hand', 'right hand', 'left finger', 'right finger', 'groin', 'glutes', 'left thigh', 'right thigh', 'left hamstring', 'right hamstring', 'left knee', 'right knee', 'left calf muscle', 'right calf muscle', 'left ankle', 'right ankle', 'left achillis', 'right achillis', 'left heel', 'right heel', 'left toe finger', 'right toe finger', 'abdomen', 'lower back') NOT NULL,
    `injuryDate` DATE NOT NULL,
    `injuryTime` TIME(0) NOT NULL,
    `activityType` ENUM('training', 'competition', 'other') NOT NULL,
    `injuryType` ENUM('severe', 'moderate', 'mild') NOT NULL,
    `recoveryTime` ENUM('3 - 5 Days', '1 - 2 weeks', 'Less than a month', '1 - 3 Months', 'More than 3 months') NOT NULL,
    `isAidDone` BOOLEAN NOT NULL DEFAULT true,
    `medicalReport` VARCHAR(255) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `coachId` INTEGER NULL,

    INDEX `athleteId`(`athleteId`),
    INDEX `coachId`(`coachId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `countryCode` VARCHAR(255) NOT NULL DEFAULT '+91',
    `mobile` VARCHAR(255) NOT NULL,
    `otp` VARCHAR(4) NOT NULL,
    `expiryTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `verified` TINYINT NULL DEFAULT 0,
    `userType` ENUM('athlete', 'coach', 'both_exist') NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,
    `price` FLOAT NOT NULL,
    `amountToBePaid` FLOAT NOT NULL,
    `paidAmount` FLOAT NULL DEFAULT 0,
    `planType` ENUM('one_time') NOT NULL,
    `paymentType` ENUM('monthly') NOT NULL,
    `paymentStatus` ENUM('failed', 'paid', 'pending') NULL DEFAULT 'pending',
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `athleteId`(`athleteId`),
    INDEX `batchId`(`batchId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athleteId` INTEGER NOT NULL,
    `coachId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `rating` TINYINT NOT NULL,
    `comment` VARCHAR(255) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `athleteId`(`athleteId`),
    INDEX `coachId`(`coachId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drillId` INTEGER NULL,
    `planId` INTEGER NULL,
    `url` VARCHAR(255) NOT NULL,
    `type` ENUM('link', 'image', 'pdf', 'video') NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `drillId`(`drillId`),
    INDEX `planId`(`planId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduledCenterBatches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schedulePlanId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,
    `centerId` INTEGER NULL,
    `batchId` INTEGER NULL,
    `allCenters` BOOLEAN NOT NULL DEFAULT false,
    `allBatches` BOOLEAN NOT NULL DEFAULT false,

    INDEX `batchId`(`batchId`),
    INDEX `centerId`(`centerId`),
    INDEX `schedulePlanId`(`schedulePlanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduledPlans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planId` INTEGER NOT NULL,
    `fromDate` DATE NOT NULL,
    `toDate` DATE NOT NULL,
    `coachId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `coachId`(`coachId`),
    INDEX `planId`(`planId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SportsColorMaps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sportId` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `colorId`(`colorId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staffs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestBanks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `testBankId` INTEGER NOT NULL,
    `trainingLevel` ENUM('beginner', 'intermediate', 'advanced', 'developer') NOT NULL,
    `objective` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `fitnessType` ENUM('general fitness', 'sport specific') NULL,
    `fitnessComponent` ENUM('endurance', 'speed', 'strength', 'agility', 'movement coordination', 'balance', 'flexibility', 'reaction time') NULL,
    `sportId` INTEGER NULL,
    `academyId` INTEGER NOT NULL,
    `measureType` ENUM('numeric value', 'star rating index') NOT NULL,
    `unitType` ENUM('metric units', 'time units', 'heart rate', 'reps') NULL,
    `units` ENUM('mm', 'cm', 'm', 'km', 'sec', 'min', 'hour') NULL,
    `minValue` INTEGER NULL,
    `maxValue` INTEGER NULL,
    `testGoal` ENUM('lowest value is high', 'highest value is high') NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `academyId`(`academyId`),
    INDEX `sportId`(`sportId`),
    INDEX `testBankId`(`testBankId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketMessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketId` INTEGER NOT NULL,
    `message` VARCHAR(255) NULL,
    `staffId` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `userId` INTEGER NOT NULL,
    `userType` ENUM('athlete', 'coach', 'both_exist') NOT NULL,

    INDEX `ticketId`(`ticketId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tickets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,
    `ticketStatus` ENUM('open', 'closed') NULL DEFAULT 'open',
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `userId` INTEGER NOT NULL,
    `userType` ENUM('athlete', 'coach', 'both_exist') NOT NULL,

    INDEX `categoryId`(`categoryId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `countryCode` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `expiryDate` DATETIME(0) NULL,
    `token` VARCHAR(255) NULL,
    `userType` ENUM('athlete', 'coach', 'both_exist') NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `phone`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrainingDrills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `objective` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `coachingPoint` VARCHAR(255) NOT NULL,
    `level` ENUM('beginner', 'intermediate', 'advanced', 'developer') NOT NULL,
    `fitnessComponent` ENUM('endurance', 'speed', 'strength', 'agility', 'movement coordination', 'balance', 'flexibility', 'reaction time') NULL,
    `sportId` INTEGER NULL,
    `coachId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `coachId`(`coachId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrainingPlans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `objective` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `coachingPoint` VARCHAR(255) NULL,
    `duration` ENUM('daily', 'weekly', 'monthly', 'quarterly', 'half yearly', 'annual') NOT NULL,
    `level` ENUM('beginner', 'intermediate', 'advanced', 'developer') NOT NULL,
    `fitnessComponent` JSON NULL,
    `sportId` INTEGER NULL,
    `coachId` INTEGER NOT NULL,
    `isScheduled` BOOLEAN NULL,
    `status` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `coachId`(`coachId`),
    INDEX `sportId`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignedDrillFitnessComponents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fitnessComponent` ENUM('endurance', 'speed', 'strength', 'agility', 'movement coordination', 'balance', 'flexibility', 'reaction time') NULL,
    `planId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignedDrills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drillFitnessComponentId` INTEGER NOT NULL,
    `drillId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `drillFitnessComponentId`(`drillFitnessComponentId`),
    INDEX `drillId`(`drillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignedEquipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drillId` INTEGER NOT NULL,
    `equipment` ENUM('dumbells', 'barbells', 'resistance band', 'jump rope', 'agility ladder', 'hurdles', 'medicine kettle ball', 'cones', 'markers', 'balls', 'racket or bat', 'net', 'whistle', 'stop watch') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `drillId`(`drillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachCentersBatches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `batchId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,
    `coachId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `coachId`(`coachId`),
    UNIQUE INDEX `CoachCentersBatches_centerId_coachId_unique`(`centerId`, `coachId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachOnCenters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coachId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `centerId`(`centerId`),
    UNIQUE INDEX `CoachOnCenters_coachId_centerId_unique`(`coachId`, `centerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachOnCentersBatches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coachId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `centerId`(`centerId`),
    UNIQUE INDEX `CoachOnCentersBatches_centerId_coachId_unique`(`coachId`, `centerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachQualifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `certificateType` ENUM('masters degree in sports or fitness training', 'bachelor degree in sports or fitness training', 'diploma in sports coaching or fitness training', 'coaching license', 'certification in sports coaching or fitness training') NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `coachId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `instituteName` VARCHAR(255) NOT NULL,
    `fileUrl` VARCHAR(255) NOT NULL,
    `fileName` VARCHAR(255) NULL,
    `fileType` ENUM('link', 'image', 'pdf', 'video') NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `coachId`(`coachId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `academyId` ON `Batches`(`academyId`);

-- CreateIndex
CREATE INDEX `coachId` ON `Batches`(`coachId`);

-- CreateIndex
CREATE INDEX `sportId` ON `Batches`(`sportId`);

-- AddForeignKey
ALTER TABLE `AcademySportsMaps` ADD CONSTRAINT `AcademySportsMaps_ibfk_795` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademySportsMaps` ADD CONSTRAINT `AcademySportsMaps_ibfk_796` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAssignedAthletes` ADD CONSTRAINT `AssessmentAssignedAthletes_ibfk_609` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAssignedAthletes` ADD CONSTRAINT `AssessmentAssignedAthletes_ibfk_610` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAssignedCoaches` ADD CONSTRAINT `AssessmentAssignedCoaches_ibfk_607` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAssignedCoaches` ADD CONSTRAINT `AssessmentAssignedCoaches_ibfk_608` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentBatches` ADD CONSTRAINT `AssessmentBatches_ibfk_629` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentBatches` ADD CONSTRAINT `AssessmentBatches_ibfk_630` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentCenterBatches` ADD CONSTRAINT `AssessmentCenterBatches_ibfk_51` FOREIGN KEY (`assessmentCenterId`) REFERENCES `AssessmentCenters`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentCenterBatches` ADD CONSTRAINT `AssessmentCenterBatches_ibfk_52` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentCenterSports` ADD CONSTRAINT `AssessmentCenterSports_ibfk_55` FOREIGN KEY (`assessmentCenterId`) REFERENCES `AssessmentCenters`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentCenterSports` ADD CONSTRAINT `AssessmentCenterSports_ibfk_56` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentCenters` ADD CONSTRAINT `AssessmentCenters_ibfk_703` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentCenters` ADD CONSTRAINT `AssessmentCenters_ibfk_704` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_ibfk_1247` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_ibfk_1248` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_ibfk_1249` FOREIGN KEY (`assignedTestId`) REFERENCES `AssignedTests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_ibfk_1250` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentSports` ADD CONSTRAINT `AssessmentSports_ibfk_587` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentSports` ADD CONSTRAINT `AssessmentSports_ibfk_588` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_ibfk_207` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_ibfk_208` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedTestBanks` ADD CONSTRAINT `AssignedTestBanks_ibfk_553` FOREIGN KEY (`assessmentId`) REFERENCES `Assessments`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedTestBanks` ADD CONSTRAINT `AssignedTestBanks_ibfk_554` FOREIGN KEY (`testBankId`) REFERENCES `TestBanks`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedTests` ADD CONSTRAINT `AssignedTests_ibfk_713` FOREIGN KEY (`assignedTestBankId`) REFERENCES `AssignedTestBanks`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedTests` ADD CONSTRAINT `AssignedTests_ibfk_714` FOREIGN KEY (`testId`) REFERENCES `Tests`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteAttendances` ADD CONSTRAINT `AthleteAttendances_ibfk_785` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteAttendances` ADD CONSTRAINT `AthleteAttendances_ibfk_786` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteBatchesMaps` ADD CONSTRAINT `AthleteBatchesMaps_ibfk_813` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteBatchesMaps` ADD CONSTRAINT `AthleteBatchesMaps_ibfk_814` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteBatchesMaps` ADD CONSTRAINT `AthleteBatchesMaps_ibfk_815` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteSportsMaps` ADD CONSTRAINT `AthleteSportsMaps_ibfk_1730` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteSportsMaps` ADD CONSTRAINT `AthleteSportsMaps_ibfk_1731` FOREIGN KEY (`sportsId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteSportsMaps` ADD CONSTRAINT `AthleteSportsMaps_ibfk_1732` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AthleteSportsMaps` ADD CONSTRAINT `AthleteSportsMaps_ibfk_1733` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athletes` ADD CONSTRAINT `Athletes_ibfk_1` FOREIGN KEY (`academyCode`) REFERENCES `Academies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BatchSchedules` ADD CONSTRAINT `BatchSchedules_ibfk_1` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batches` ADD CONSTRAINT `Batches_ibfk_1341` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batches` ADD CONSTRAINT `Batches_ibfk_1342` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batches` ADD CONSTRAINT `Batches_ibfk_1343` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Centers` ADD CONSTRAINT `Centers_ibfk_1` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachSportsMaps` ADD CONSTRAINT `CoachSportsMaps_ibfk_777` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachSportsMaps` ADD CONSTRAINT `CoachSportsMaps_ibfk_778` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coaches` ADD CONSTRAINT `Coaches_ibfk_641` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coaches` ADD CONSTRAINT `Coaches_ibfk_642` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feeds` ADD CONSTRAINT `Feeds_ibfk_1` FOREIGN KEY (`staffId`) REFERENCES `Staffs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HideFeeds` ADD CONSTRAINT `HideFeeds_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Athletes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `InjuryImages` ADD CONSTRAINT `InjuryImages_ibfk_1` FOREIGN KEY (`injuryId`) REFERENCES `InjuryLogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InjuryLogs` ADD CONSTRAINT `InjuryLogs_ibfk_55` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InjuryLogs` ADD CONSTRAINT `InjuryLogs_ibfk_56` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_ibfk_808` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_ibfk_809` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_ibfk_810` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_ibfk_953` FOREIGN KEY (`athleteId`) REFERENCES `Athletes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_ibfk_954` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_ibfk_955` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resources` ADD CONSTRAINT `Resources_ibfk_565` FOREIGN KEY (`drillId`) REFERENCES `TrainingDrills`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resources` ADD CONSTRAINT `Resources_ibfk_566` FOREIGN KEY (`planId`) REFERENCES `TrainingPlans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledCenterBatches` ADD CONSTRAINT `ScheduledCenterBatches_ibfk_319` FOREIGN KEY (`centerId`) REFERENCES `Coaches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledCenterBatches` ADD CONSTRAINT `ScheduledCenterBatches_ibfk_318` FOREIGN KEY (`schedulePlanId`) REFERENCES `ScheduledPlans`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledCenterBatches` ADD CONSTRAINT `ScheduledCenterBatches_ibfk_321` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledCenterBatches` ADD CONSTRAINT `ScheduledCenterBatches_ibfk_320` FOREIGN KEY (`batchId`) REFERENCES `Batches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledPlans` ADD CONSTRAINT `ScheduledPlans_ibfk_557` FOREIGN KEY (`planId`) REFERENCES `TrainingPlans`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledPlans` ADD CONSTRAINT `ScheduledPlans_ibfk_558` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SportsColorMaps` ADD CONSTRAINT `SportsColorMaps_ibfk_517` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SportsColorMaps` ADD CONSTRAINT `SportsColorMaps_ibfk_518` FOREIGN KEY (`colorId`) REFERENCES `Colors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tests` ADD CONSTRAINT `Tests_ibfk_1146` FOREIGN KEY (`testBankId`) REFERENCES `TestBanks`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tests` ADD CONSTRAINT `Tests_ibfk_1147` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tests` ADD CONSTRAINT `Tests_ibfk_1148` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketMessages` ADD CONSTRAINT `TicketMessages_ibfk_371` FOREIGN KEY (`ticketId`) REFERENCES `Tickets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketMessages` ADD CONSTRAINT `TicketMessages_ibfk_372` FOREIGN KEY (`userId`) REFERENCES `Athletes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_ibfk_387` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_ibfk_388` FOREIGN KEY (`userId`) REFERENCES `Athletes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TrainingDrills` ADD CONSTRAINT `TrainingDrills_ibfk_597` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingDrills` ADD CONSTRAINT `TrainingDrills_ibfk_598` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingPlans` ADD CONSTRAINT `TrainingPlans_ibfk_581` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingPlans` ADD CONSTRAINT `TrainingPlans_ibfk_582` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedDrills` ADD CONSTRAINT `AssignedDrills_ibfk_319` FOREIGN KEY (`drillFitnessComponentId`) REFERENCES `AssignedDrillFitnessComponents`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedDrills` ADD CONSTRAINT `AssignedDrills_ibfk_320` FOREIGN KEY (`drillId`) REFERENCES `TrainingDrills`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedEquipments` ADD CONSTRAINT `AssignedEquipments_ibfk_1` FOREIGN KEY (`drillId`) REFERENCES `TrainingDrills`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachCentersBatches` ADD CONSTRAINT `CoachCentersBatches_ibfk_253` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachCentersBatches` ADD CONSTRAINT `CoachCentersBatches_ibfk_254` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_21` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_22` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_3` FOREIGN KEY (`coachId`) REFERENCES `CoachOnCenters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_4` FOREIGN KEY (`centerId`) REFERENCES `CoachOnCenters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCentersBatches` ADD CONSTRAINT `CoachOnCentersBatches_ibfk_1` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCentersBatches` ADD CONSTRAINT `CoachOnCentersBatches_ibfk_2` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachQualifications` ADD CONSTRAINT `CoachQualifications_ibfk_1` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Batches` RENAME INDEX `Batches_id_key` TO `id`;

-- RenameIndex
ALTER TABLE `Sports` RENAME INDEX `Sports_id_key` TO `id`;

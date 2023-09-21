-- CreateTable
CREATE TABLE `Example` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `oauth_token_secret` TEXT NULL,
    `oauth_token` TEXT NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coach` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `about` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `payrollId` INTEGER NULL,
    `trainingLevel` ENUM('BEGINNER', 'DEVELOPER', 'INTERMEDIATE_LEVEL', 'ADVANCED_LEVEL') NOT NULL,
    `experienceLevel` ENUM('ZERO_ONE', 'TWO_FIVE', 'SIX_TEN', 'TEN_OVER') NOT NULL,
    `centerId` INTEGER NULL,
    `image` LONGBLOB NULL,

    UNIQUE INDEX `Coach_id_key`(`id`),
    UNIQUE INDEX `Coach_email_key`(`email`),
    INDEX `Coach_centerId_idx`(`centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contactNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `image` LONGBLOB NULL,

    UNIQUE INDEX `Staff_id_key`(`id`),
    UNIQUE INDEX `Staff_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shift` VARCHAR(191) NOT NULL,
    `staffId` INTEGER NULL,

    UNIQUE INDEX `Shift_id_key`(`id`),
    INDEX `Shift_staffId_idx`(`staffId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `centerId` INTEGER NULL,

    UNIQUE INDEX `Inventory_id_key`(`id`),
    INDEX `Inventory_centerId_idx`(`centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coachId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `staffId` INTEGER NOT NULL,

    UNIQUE INDEX `Payroll_id_key`(`id`),
    UNIQUE INDEX `Payroll_coachId_key`(`coachId`),
    UNIQUE INDEX `Payroll_staffId_key`(`staffId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sports_id_key`(`id`),
    UNIQUE INDEX `Sports_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SportsOnCenters` (
    `sportId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,

    INDEX `SportsOnCenters_sportId_idx`(`sportId`),
    INDEX `SportsOnCenters_centerId_idx`(`centerId`),
    PRIMARY KEY (`sportId`, `centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachesOnCenters` (
    `coachId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CoachesOnCenters_coachId_idx`(`coachId`),
    INDEX `CoachesOnCenters_centerId_idx`(`centerId`),
    PRIMARY KEY (`coachId`, `centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachesOnSports` (
    `coachId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CoachesOnSports_coachId_idx`(`coachId`),
    INDEX `CoachesOnSports_sportId_idx`(`sportId`),
    PRIMARY KEY (`coachId`, `sportId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startEnd` DATETIME(3) NULL,
    `instituteName` VARCHAR(191) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `coachId` INTEGER NOT NULL,

    UNIQUE INDEX `Certificates_id_key`(`id`),
    INDEX `Certificates_coachId_idx`(`coachId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Center` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NULL,

    UNIQUE INDEX `Center_id_key`(`id`),
    UNIQUE INDEX `Center_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `centerId` INTEGER NOT NULL,

    UNIQUE INDEX `Batches_id_key`(`id`),
    INDEX `Batches_centerId_idx`(`centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachesOnBatches` (
    `coachId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CoachesOnBatches_coachId_idx`(`coachId`),
    INDEX `CoachesOnBatches_batchId_idx`(`batchId`),
    PRIMARY KEY (`coachId`, `batchId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffCenter` (
    `staffId` INTEGER NOT NULL,
    `centerId` INTEGER NOT NULL,

    INDEX `StaffCenter_staffId_idx`(`staffId`),
    INDEX `StaffCenter_centerId_idx`(`centerId`),
    PRIMARY KEY (`staffId`, `centerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Academies` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `AssignedDrillFitnessComponents` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `AssignedDrills` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `AssignedEquipments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `Centers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `CoachCentersBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `CoachOnCenters` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `CoachOnCentersBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `CoachSportsMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `Coaches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `Resources` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `ScheduledCenterBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `ScheduledPlans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `Sports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `Tokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `TrainingDrills` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deletedAt` on the `TrainingPlans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `Academies` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `AssignedDrillFitnessComponents` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `AssignedDrills` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `AssignedEquipments` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `Centers` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `CoachCentersBatches` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `CoachOnCenters` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `CoachOnCentersBatches` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `CoachSportsMaps` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `Coaches` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `Resources` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `ScheduledCenterBatches` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `ScheduledPlans` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `Sports` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `Tokens` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `TrainingDrills` MODIFY `deletedAt` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `TrainingPlans` MODIFY `deletedAt` DATETIME(0) NULL;

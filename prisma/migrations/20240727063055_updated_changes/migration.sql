/*
  Warnings:

  - You are about to alter the column `createdAt` on the `AssessmentAssignedAthletes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentAssignedAthletes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentAssignedCoaches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentAssignedCoaches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentCenterBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentCenterBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentCenterSports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentCenterSports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentCenters` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentCenters` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentResults` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentResults` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `date` on the `AssessmentResults` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssessmentSports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssessmentSports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Assessments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Assessments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssignedDrillFitnessComponents` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssignedDrillFitnessComponents` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssignedDrills` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssignedDrills` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssignedEquipments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssignedEquipments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssignedTestBanks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssignedTestBanks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AssignedTests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AssignedTests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AthleteAttendances` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AthleteAttendances` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AthleteBatchesMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AthleteBatchesMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `AthleteSportsMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `AthleteSportsMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Athletes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Athletes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `startTime` on the `BatchSchedules` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time(0)`.
  - You are about to alter the column `endTime` on the `BatchSchedules` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time(0)`.
  - You are about to alter the column `createdAt` on the `BatchSchedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `BatchSchedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Batches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Batches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Centers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Centers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `CoachCentersBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `CoachCentersBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `CoachQualifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `CoachQualifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `CoachSportsMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `CoachSportsMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Coaches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Coaches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Colors` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Colors` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Feeds` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Feeds` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `HideFeeds` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `HideFeeds` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `InjuryImages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `InjuryImages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `InjuryLogs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `InjuryLogs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `expiryTime` on the `Otps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Otps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Otps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Payments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Payments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Ratings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Ratings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Resources` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Resources` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `ScheduledCenterBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `ScheduledCenterBatches` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `ScheduledPlans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `ScheduledPlans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Sports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Sports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `SportsColorMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `SportsColorMaps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Staffs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Staffs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `TestBanks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `TestBanks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Tests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Tests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `TicketMessages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `TicketMessages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Tickets` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Tickets` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `expiryDate` on the `Tokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `Tokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `Tokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `TrainingDrills` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `TrainingDrills` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `createdAt` on the `TrainingPlans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `TrainingPlans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - Added the required column `academyId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `Assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyCode` to the `Athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remainingSeat` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Made the column `occupiedSeat` on table `Batches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Centers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `about` to the `Coaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `Coaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Athletes` DROP FOREIGN KEY `Athletes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ScheduledCenterBatches` DROP FOREIGN KEY `ScheduledCenterBatches_ibfk_319`;

-- DropForeignKey
ALTER TABLE `Tests` DROP FOREIGN KEY `Tests_ibfk_1148`;

-- DropIndex
DROP INDEX `email` ON `Centers`;

-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `academyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentAssignedAthletes` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentAssignedCoaches` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentBatches` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentCenterBatches` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentCenterSports` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentCenters` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssessmentResults` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL,
    MODIFY `date` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `AssessmentSports` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Assessments` ADD COLUMN `academyId` INTEGER NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssignedDrillFitnessComponents` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssignedDrills` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssignedEquipments` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssignedTestBanks` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AssignedTests` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AthleteAttendances` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AthleteBatchesMaps` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `AthleteSportsMaps` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Athletes` ADD COLUMN `academyCode` INTEGER NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `BatchSchedules` MODIFY `startTime` TIME(0) NOT NULL,
    MODIFY `endTime` TIME(0) NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Batches` ADD COLUMN `academyId` INTEGER NOT NULL,
    ADD COLUMN `remainingSeat` INTEGER NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `occupiedSeat` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Categories` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `CenterSports` ADD COLUMN `academyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Centers` ADD COLUMN `academyId` INTEGER NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `CoachCentersBatches` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `CoachQualifications` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `CoachSportsMaps` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Coaches` ADD COLUMN `about` TEXT NOT NULL,
    ADD COLUMN `academyId` INTEGER NOT NULL,
    ADD COLUMN `centerId` INTEGER NULL,
    ADD COLUMN `experience` VARCHAR(255) NULL,
    ADD COLUMN `experienceLevel` ENUM('zero_one', 'two_five', 'six_ten', 'ten_over') NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Colors` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Feeds` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `HideFeeds` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `InjuryImages` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `InjuryLogs` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Otps` MODIFY `expiryTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Payments` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Ratings` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Resources` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `ScheduledCenterBatches` ADD COLUMN `coachId` INTEGER NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `ScheduledPlans` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Sports` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `SportsColorMaps` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Staffs` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `TestBanks` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Tests` ADD COLUMN `academyId` INTEGER NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `TicketMessages` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Tickets` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `Tokens` MODIFY `expiryDate` DATETIME(0) NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `TrainingDrills` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `TrainingPlans` MODIFY `createdAt` DATETIME(0) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NOT NULL;

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

-- CreateIndex
CREATE INDEX `academyId` ON `Admin`(`academyId`);

-- CreateIndex
CREATE INDEX `academyId` ON `Assessments`(`academyId`);

-- CreateIndex
CREATE INDEX `academyCode` ON `Athletes`(`academyCode`);

-- CreateIndex
CREATE INDEX `academyId` ON `Batches`(`academyId`);

-- CreateIndex
CREATE INDEX `academyId` ON `CenterSports`(`academyId`);

-- CreateIndex
CREATE INDEX `academyId` ON `Centers`(`academyId`);

-- CreateIndex
CREATE INDEX `academyId` ON `Coaches`(`academyId`);

-- CreateIndex
CREATE INDEX `centerId` ON `Coaches`(`centerId`);

-- CreateIndex
CREATE INDEX `coachId` ON `ScheduledCenterBatches`(`coachId`);

-- CreateIndex
CREATE INDEX `academyId` ON `Tests`(`academyId`);

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_ibfk_917` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athletes` ADD CONSTRAINT `Athletes_ibfk_1` FOREIGN KEY (`academyCode`) REFERENCES `Academies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athletes` ADD CONSTRAINT `AthletesCenters_ibfk_1` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CenterSports` ADD CONSTRAINT `AcademyCenterSportsMaps_ibfk_796` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batches` ADD CONSTRAINT `Batches_ibfk_2793` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Centers` ADD CONSTRAINT `Centers_ibfk_1` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `AcademyAdmin_ibfk_1` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coaches` ADD CONSTRAINT `Coaches_ibfk_399` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coaches` ADD CONSTRAINT `Coaches_ibfk_400` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledCenterBatches` ADD CONSTRAINT `ScheduledCoachBatches_ibfk_321` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tests` ADD CONSTRAINT `Tests_ibfk_2258` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tests` ADD CONSTRAINT `TestsCenter_ibfk_2258` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademySportsMaps` ADD CONSTRAINT `AcademySportsMaps_ibfk_283` FOREIGN KEY (`sportId`) REFERENCES `Sports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademySportsMaps` ADD CONSTRAINT `AcademySportsMaps_ibfk_284` FOREIGN KEY (`academyId`) REFERENCES `Academies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_21` FOREIGN KEY (`coachId`) REFERENCES `Coaches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_22` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_3` FOREIGN KEY (`coachId`) REFERENCES `CoachOnCenters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOnCenters` ADD CONSTRAINT `CoachOnCenters_ibfk_4` FOREIGN KEY (`centerId`) REFERENCES `CoachOnCenters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

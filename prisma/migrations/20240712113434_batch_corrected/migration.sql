/*
  Warnings:

  - You are about to drop the column `remainingSeat` on the `Batches` table. All the data in the column will be lost.
  - You are about to alter the column `occupiedSeat` on the `Batches` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Batches` DROP COLUMN `remainingSeat`,
    MODIFY `occupiedSeat` TINYINT NULL DEFAULT 0;

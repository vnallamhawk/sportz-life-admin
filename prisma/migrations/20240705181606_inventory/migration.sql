-- CreateTable
CREATE TABLE `Inventories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `address` TEXT NOT NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `centerId` INTEGER NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `centerId`(`centerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inventories` ADD CONSTRAINT `Inventories_ibfk_1` FOREIGN KEY (`centerId`) REFERENCES `Centers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `BatchDays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Monday` BOOLEAN NOT NULL DEFAULT false,
    `Tuesday` BOOLEAN NOT NULL DEFAULT false,
    `Wednesday` BOOLEAN NOT NULL DEFAULT false,
    `Thursday` BOOLEAN NOT NULL DEFAULT false,
    `Friday` BOOLEAN NOT NULL DEFAULT false,
    `Saturday` BOOLEAN NOT NULL DEFAULT false,
    `Sunday` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

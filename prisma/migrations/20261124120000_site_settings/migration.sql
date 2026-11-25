-- CreateTable
CREATE TABLE `site_settings` (
    `id` INTEGER NOT NULL,
    `footerTagline` TEXT NOT NULL,
    `footerAddress` VARCHAR(191) NOT NULL,
    `footerPhone` VARCHAR(191) NOT NULL,
    `footerEmail` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`id`, `footerTagline`, `footerAddress`, `footerPhone`, `footerEmail`, `updatedAt`)
VALUES (
    1,
    'Mobile accessories engineered for everyday speed — cables, chargers, earbuds and adapters that just work.',
    'Lahore, Pakistan',
    '+92 300 1234567',
    'support@agmoo.com',
    CURRENT_TIMESTAMP(3)
);
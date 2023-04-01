-- CreateTable
CREATE TABLE `Url` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalURL` VARCHAR(191) NOT NULL,
    `shortURL` INTEGER NOT NULL,

    UNIQUE INDEX `Url_originalURL_key`(`originalURL`),
    UNIQUE INDEX `Url_shortURL_key`(`shortURL`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

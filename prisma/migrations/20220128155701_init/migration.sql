/*
  Warnings:

  - You are about to drop the column `total_processed_contact` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `total_uploaded_contact` on the `files` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `total_processed_file` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_uploaded_file` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `files` DROP COLUMN `total_processed_contact`,
    DROP COLUMN `total_uploaded_contact`,
    ADD COLUMN `total_processed_file` INTEGER NOT NULL,
    ADD COLUMN `total_uploaded_file` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `chunks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `path` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `file_id_foreign`(`file_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_id` INTEGER,
    `chunk_id` INTEGER,
    `number` INTEGER NOT NULL,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `email` VARCHAR(255),
    `state` VARCHAR(255),
    `zip` VARCHAR(255),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `chunk_id_foreign`(`chunk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chunks` ADD CONSTRAINT `file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `chunk_id_foreign` FOREIGN KEY (`chunk_id`) REFERENCES `chunks`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

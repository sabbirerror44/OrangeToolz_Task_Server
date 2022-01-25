/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`email`);

-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `file` VARCHAR(255) NOT NULL,
    `total_uploaded_contact` VARCHAR(255) NOT NULL,
    `total_processed_contact` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

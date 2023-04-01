/*
  Warnings:

  - You are about to drop the column `shortURL` on the `Url` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Url_shortURL_key` ON `Url`;

-- AlterTable
ALTER TABLE `Url` DROP COLUMN `shortURL`;

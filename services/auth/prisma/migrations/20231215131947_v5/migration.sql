/*
  Warnings:

  - You are about to drop the column `firebase` on the `User` table. All the data in the column will be lost.
  - The values [ADMIN] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `firebase`,
    MODIFY `role` ENUM('USER', 'PREMIUM') NOT NULL DEFAULT 'USER';

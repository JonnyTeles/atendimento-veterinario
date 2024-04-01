/*
  Warnings:

  - You are about to drop the column `racaId` on the `cachorros` table. All the data in the column will be lost.
  - Added the required column `raca` to the `cachorros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cachorros` DROP COLUMN `racaId`,
    ADD COLUMN `raca` JSON NOT NULL;

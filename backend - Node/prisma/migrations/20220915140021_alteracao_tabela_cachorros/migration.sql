/*
  Warnings:

  - You are about to drop the column `raca` on the `cachorros` table. All the data in the column will be lost.
  - Added the required column `racaId` to the `cachorros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cachorros` DROP COLUMN `raca`,
    ADD COLUMN `racaId` JSON NOT NULL;

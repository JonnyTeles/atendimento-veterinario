/*
  Warnings:

  - You are about to drop the column `dia` on the `atendimentos` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `atendimentos` table. All the data in the column will be lost.
  - Added the required column `data` to the `atendimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `atendimentos` DROP COLUMN `dia`,
    DROP COLUMN `hora`,
    ADD COLUMN `data` DATETIME(3) NOT NULL;

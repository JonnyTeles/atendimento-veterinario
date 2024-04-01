/*
  Warnings:

  - A unique constraint covering the columns `[passwordToken]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passwordToken]` on the table `veterinarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `passwordToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `veterinarios` ADD COLUMN `passwordToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clientes_passwordToken_key` ON `clientes`(`passwordToken`);

-- CreateIndex
CREATE UNIQUE INDEX `veterinarios_passwordToken_key` ON `veterinarios`(`passwordToken`);

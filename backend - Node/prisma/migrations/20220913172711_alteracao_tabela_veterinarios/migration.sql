/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `veterinarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `veterinarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `veterinarios_email_key` ON `veterinarios`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `veterinarios_cpf_key` ON `veterinarios`(`cpf`);

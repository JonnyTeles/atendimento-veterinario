/*
  Warnings:

  - A unique constraint covering the columns `[data]` on the table `atendimentos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `atendimentos_data_key` ON `atendimentos`(`data`);

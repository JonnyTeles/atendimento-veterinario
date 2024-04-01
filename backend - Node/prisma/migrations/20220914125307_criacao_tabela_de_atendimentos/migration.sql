-- CreateTable
CREATE TABLE `atendimentos` (
    `idAtendimento` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` VARCHAR(191) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `diagnostico` VARCHAR(2000) NOT NULL,
    `comentarios` VARCHAR(2000) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `cachorroId` INTEGER NOT NULL,
    `veterinarioId` INTEGER NOT NULL,

    PRIMARY KEY (`idAtendimento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `atendimentos` ADD CONSTRAINT `atendimentos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atendimentos` ADD CONSTRAINT `atendimentos_cachorroId_fkey` FOREIGN KEY (`cachorroId`) REFERENCES `cachorros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atendimentos` ADD CONSTRAINT `atendimentos_veterinarioId_fkey` FOREIGN KEY (`veterinarioId`) REFERENCES `veterinarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

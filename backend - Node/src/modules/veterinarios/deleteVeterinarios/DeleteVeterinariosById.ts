import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DeleteVeterinariosById {
    async execute(req: Request) {
        const { id } = req.query
        const veterinarioNaoExiste = await prisma.veterinarios.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!veterinarioNaoExiste) {
            throw new AppError(`Veterinário com ID ${id} não encontrado.`, 404)
        }

        const veterinarioDeletado = await prisma.veterinarios.delete({
            where: {
                id: Number(id)
            }
        })

    }
}
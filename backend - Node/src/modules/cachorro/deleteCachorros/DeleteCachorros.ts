import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DeleteCachorros {
    async execute(req: Request) {
        const { id } = req.query

        const cachorroExiste = await prisma.cachorros.findUnique({
            where:{
                id: Number(id)
            }
        })
        if(!cachorroExiste){
            throw new AppError(`Cachorro com ID ${id} não foi encontrado.`, 404)
        }

         await prisma.cachorros.delete({
            where: {
                id: Number(id)
            }
        })
    }
}
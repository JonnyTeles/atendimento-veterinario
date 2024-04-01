import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class ValidToken {
    async execute(req: Request, res: Response){
        const {token} = req.body

        const user = await prisma.clientes.findUnique({
            where:{
                passwordToken: String(token)
            }
        })

        const vet = await prisma.veterinarios.findUnique({
            where:{
                passwordToken: String(token)
            }
        })

        if(!user && !vet){
            throw new AppError('Código inválido.', 400)
        }
    }
}
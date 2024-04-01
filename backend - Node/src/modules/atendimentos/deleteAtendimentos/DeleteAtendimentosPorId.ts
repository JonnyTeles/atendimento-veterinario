import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class deleteAtendimentosPorId{
    async execute(req: Request){
        const {id} = req.query 
        const atendimento = await prisma.atendimento.findUnique({
            where:{
                idAtendimento: Number(id)
            }
        })
        if(atendimento == null){
            throw new AppError(`Atendimento com o ID ${id} não encontrado.`, 404)
        }

         await prisma.atendimento.delete({
            where:{
                idAtendimento: Number(id)
            }
        })

    }
}
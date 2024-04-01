import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetAllAtendimentos{
    async execute(req: Request){
        const atendimentos = await prisma.atendimento.findMany({
            orderBy:{
                data: "asc"
            },
            select: {
                idAtendimento: true,
                data: true,
                diagnostico: true,
                comentarios: true,
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true
                    }
                },
                cachorro: {
                    select: {
                        id: true,
                        nome: true,
                        raca: true,
                        sexo: true,
                        cor: true,
                        peso: true,
                        idade: true
                    }
                },
                veterinario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true,
                        especializacao: true
                    }
                }
            }
        })
        if(atendimentos.length == 0){
            throw new AppError(`Nenhum atendimento cadastrado.`, 404)
        }
        return atendimentos
    }
}
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetCachorosById {
    async execute(req: Request) {
        const { id } = req.query
        const cachorro = await prisma.cachorros.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                nome: true,
                raca: true,
                sexo: true,
                cor: true,
                idade: true,
                peso: true,
                tutor: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true,
                    }
                },
                atendimento:{
                    select:{
                        idAtendimento: true,
                        data: true,
                        diagnostico: true,
                        comentarios: true,
                        veterinario: {
                            select:{
                                id: true,
                                nome: true,
                                email: true,
                                especializacao: true
                            }
                        }
                    }
                }
            }
        })
        if (cachorro == null) {
            throw new AppError(`Cachorro com ID ${id} não foi encontrado.`, 404);
        }

        return cachorro
    }
}
import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetVeterinariosById {
    async execute(req: Request) {
        const { id } = req.query
        const veterinario = await prisma.veterinarios.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                nome: true,
                email: true,
                cpf: true,
                especializacao: true,
                Atendimento:{
                    select:{
                         idAtendimento: true,
                         data: true,
                         cliente:{
                            select:{
                                id: true,
                                nome: true,
                                email: true
                            }
                         },
                         cachorro: {
                            select:{
                                id: true,
                                nome: true,
                                sexo: true,
                                peso: true,
                                idade: true,
                                cor: true,
                                raca: true
                            }
                         },
                         diagnostico: true,
                         comentarios: true
                    }
                }
            }
        })

        if (veterinario == null) {
            throw new AppError(`Veterinário com ID ${id} não encontrado.`, 404);
        }

        return veterinario
    }
}
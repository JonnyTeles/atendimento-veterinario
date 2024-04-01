import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetAtendimentoPorId {
    async execute(req: Request) {
        const { id } = req.query
        const atendimento = await prisma.atendimento.findUnique({
            where: {
                idAtendimento: Number(id)
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

        if (atendimento == null) {
            throw new AppError(`Nenhum atendimento com ID ${id} cadastrado.`, 404)
        }

        return atendimento
    }
}
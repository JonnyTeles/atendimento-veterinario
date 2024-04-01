import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetClientesById {
    async execute(req: Request, res: Response) {
        const { id } = req.query
        const clientes = await prisma.clientes.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                nome: true,
                email: true,
                cpf: true,
                cachorros: {
                    select: {
                        id: true,
                        nome: true,
                        raca: true,
                        sexo: true,
                        cor: true,
                        idade: true,
                        peso: true,
                        atendimento: {
                            select: {
                                 idAtendimento: true,
                                 data: true,
                                 diagnostico: true,
                                 comentarios: true,
                                 veterinario: {
                                    select:{
                                        id: true,
                                        nome: true
                                    }
                                 }
                            }
                        }
                    }
                },
                atendimento: {
                    select: {
                        idAtendimento: true,
                        data: true,
                        cliente: {
                            select: {
                                nome: true
                            }
                        },
                        cachorro: {
                            select: {
                                nome: true
                            }
                        },
                        veterinario: {
                            select: {
                                nome: true
                            }
                        },
                        diagnostico: true,
                        comentarios: true
                    }
                }
            }
        })
        if (clientes == null) {
            throw new AppError(`Nenhum cliente com ID ${id} foi encontrado.`, 404);
        }

        return clientes
    }
}
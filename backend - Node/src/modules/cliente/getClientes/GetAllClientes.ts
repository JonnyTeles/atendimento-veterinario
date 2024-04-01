import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetAllClientes {
    async execute() {
        const clientes = await prisma.clientes.findMany({
            orderBy: {
                nome: "asc"
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
                }
            }
        })
        if (clientes.length == 0) {
            throw new AppError('Nenhum cliente cadastrado.', 404)
        }

        return clientes;
    }
}
import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class PostAtendimentos {
    async execute(req: Request) {
        const { data, diagnostico, comentarios, clienteId, cachorroId, veterinarioId } = req.body

        console.log(data);

        const ClienteExiste = await prisma.clientes.findUnique({
            where: {
                id: Number(clienteId)
            }
        })

        if (!ClienteExiste) {
            throw new AppError(`Cliente com ID ${clienteId} não encontrado.`, 404)
        }

        const cachorroExiste = await prisma.cachorros.findUnique({
            where: {
                id: Number(cachorroId)
            }
        })

        if (!cachorroExiste) {
            throw new AppError(`Cachorro com ID ${cachorroId} não encontrado.`, 404)
        }

        const veterinarioExiste = await prisma.veterinarios.findUnique({
            where: {
                id: veterinarioId
            }
        })

        if (!veterinarioExiste) {
            throw new AppError(`Veterinário com ID ${veterinarioId} não encontrado.`)
        }

        const cachorroDoCliente = await prisma.cachorros.findUnique({
            where: {
                id: Number(cachorroId)
            }
        })

        if (cachorroDoCliente?.clienteId != clienteId) {
            throw new AppError(`Cachorro ${cachorroDoCliente?.nome} com ID ${cachorroDoCliente?.id} não percente ao cliente com ID ${clienteId}. Seu dono tem o ID: ${cachorroDoCliente?.clienteId}`, 400)
        }

        const date = new Date(data).toLocaleString()

        const verificarDataHora = await prisma.atendimento.findUnique({
            where: {
                data: date
            }
        })
        if (verificarDataHora) {
            throw new AppError(`Já existe um atendimento marcado na data ${date}`, 409)
        } 

        const atendimento = await prisma.atendimento.create({
            data: {
                data: date,
                diagnostico: String(diagnostico),
                comentarios: String(comentarios),
                clienteId: Number(clienteId),
                cachorroId: Number(cachorroId),
                veterinarioId: Number(veterinarioId)
            },
            include: {
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
                        idade: true,
                        peso: true,
                        cor: true
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

        return atendimento
    }
}
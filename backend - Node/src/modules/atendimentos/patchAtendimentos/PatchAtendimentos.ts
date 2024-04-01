import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class PatchAtendimentos {
    async execute(req: Request) {
        const { id } = req.query
        const { data, diagnostico, comentarios, clienteId, cachorroId, veterinarioId } = req.body

        const atendimentoExistente = await prisma.atendimento.findUnique({
            where: {
                idAtendimento: Number(id)
            }
        })
        if (!atendimentoExistente) {
            throw new AppError(`Atendimento com ID ${id} não encontrado.`, 404)
        }

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
            throw new AppError(`Veterinário com ID ${veterinarioId} não encontrado.`, 404)
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
            throw new AppError(`Já existe um atendimento marcado com a data ${data}`, 409)
        }


        const atendimentoEditado = await prisma.atendimento.update({
            where: {
                idAtendimento: Number(id)
            },
            data: {
                data: date,
                diagnostico: String(diagnostico),
                comentarios: String(comentarios),
                clienteId: Number(clienteId),
                cachorroId: Number(cachorroId),
                veterinarioId: Number(veterinarioId)
            }
        })

        return atendimentoEditado
    }
}
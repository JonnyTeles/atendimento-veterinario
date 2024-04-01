import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DeleteClientesById {
    async execute(req: Request) {
        const { id } = req.query
        const clienteNaoExiste = await prisma.clientes.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!clienteNaoExiste) {
            throw new AppError(`Cliente com ID ${id} não foi encontrado.`, 404)
        }

        const deleteCliente = await prisma.clientes.delete({
            where: {
                id: Number(id)
            }
        });

    }
}
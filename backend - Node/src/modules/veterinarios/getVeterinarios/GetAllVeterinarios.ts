import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetAllVeterinarios {
    async execute() {
        const veterinarios = await prisma.veterinarios.findMany({
            orderBy: {
                nome: "asc"
            },
            select: {
                id: true,
                nome: true,
                email: true,
                cpf: true,
                especializacao: true
            }
        })

        if (veterinarios.length == 0) {
            throw new AppError(`Nenhum veterinário cadastrado.`, 404)
        }
        return veterinarios
    }
}
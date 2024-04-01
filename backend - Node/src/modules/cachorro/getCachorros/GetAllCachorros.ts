import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class GetAllCachorros {
    async execute() {
        const cachorros = await prisma.cachorros.findMany({
            orderBy: {
                id: "asc"
            },
            select:{
                id: true,
                nome: true,
                raca: true,
                sexo: true,
                cor: true,
                idade: true,
                peso: true,
                tutor:{
                    select:{
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true,
                    }
                }
            }
        })

        if (cachorros.length == 0) {
            throw new AppError(`Nenhum cachorro cadastrado.`, 404)
        }
        return cachorros
    }
}
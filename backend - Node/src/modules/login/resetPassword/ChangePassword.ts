import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import * as bcrypt from 'bcrypt'

export class ChangePassword {
    async execute(req: Request) {
        const { token, senha } = req.body

        const cliente = await prisma.clientes.findUnique({
            where: {
                passwordToken: String(token)
            }
        })

        const veterinaio = await prisma.veterinarios.findUnique({
            where: {
                passwordToken: String(token)
            }
        })

        console.log(token);

        if (!cliente && !veterinaio) {
            throw new AppError(`Código de redefinição de senha incorreto.`, 400)
        }

        const senhaBcrypt = await bcrypt.hash(senha, 10)

        if (cliente) {
            await prisma.clientes.update({
                where: {
                    passwordToken: String(token)
                },
                data: {
                    senha: senhaBcrypt
                }
            })
        } else {
            if (veterinaio) {
                await prisma.veterinarios.update({
                    where: {
                        passwordToken: String(token)
                    },
                    data: {
                        senha: senhaBcrypt
                    }
                })
            }
        }

        if (cliente) {
            await prisma.clientes.update({
                where: {
                    passwordToken: String(token)
                },
                data: {
                    passwordToken: null
                }
            })
        } else {
            if (veterinaio) {
                await prisma.veterinarios.update({
                    where: {
                        passwordToken: String(token)
                    },
                    data: {
                        passwordToken: null
                    }
                })
            }
        }
    }

}
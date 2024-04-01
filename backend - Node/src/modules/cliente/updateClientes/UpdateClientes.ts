import { Request } from "express";
import { prisma } from "../../prisma/client";
import * as bcrypt from 'bcrypt'
import { AppError } from "../../errors/AppError";

export class UpdateClientes {
    async execute(req: Request) {
        try {
            const { nome, email, senha, cpf } = req.body
            const { id } = req.query

            const senhaAntiga = await prisma.clientes.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (senha == undefined) {
                const clienteUpdatade = await prisma.clientes.update({
                    data: {
                        nome: String(nome),
                        email: String(email),
                        senha: String(senhaAntiga?.senha),
                        cpf: String(cpf)
                    },
                    where: {
                        id: Number(id)
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true
                    }
                })

                return clienteUpdatade
            } else {
                const novaSenha = await bcrypt.hash(senha, 6)
                const clienteUpdatade = await prisma.clientes.update({
                    data: {
                        nome: String(nome),
                        email: String(email),
                        senha: String(novaSenha),
                        cpf: String(cpf)
                    },
                    where: {
                        id: Number(id)
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true
                    }
                })
                return clienteUpdatade
            }
        } catch (err) {
            const { id } = req.query
            const { email, cpf } = req.body


            const clienteNaoExiste = await prisma.clientes.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (!clienteNaoExiste) {
                throw new AppError(`Cliente com ID ${id} não foi encontrado.`, 404)
            }

            const emailJaCadastrado = await prisma.clientes.findUnique({
                where: {
                    email: String(email)
                }
            })

            if (emailJaCadastrado) {
                throw new AppError(`Email ${email} já esta cadastrado.`, 409)
            }

            const cpfJaCadastrado = await prisma.clientes.findUnique({
                where: {
                    cpf: String(cpf)
                }
            })

            if (cpfJaCadastrado) {
                throw new AppError(`CPF ${cpf} já esta cadastrado.`, 409)
            }

        }
    }
}
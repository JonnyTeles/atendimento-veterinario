import { Request } from "express";
import { prisma } from "../../prisma/client";
import * as bcrypt from 'bcrypt'
import { AppError } from "../../errors/AppError";

export class UpdateVeterinarios {
    async execute(req: Request) {
        try {
            const { nome, email, senha, cpf, especializacao } = req.body
            const { id } = req.query

            const senhaAntiga = await prisma.veterinarios.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (senha == undefined) {
                const veterinarioUpdated = await prisma.veterinarios.update({
                    data: {
                        nome: String(nome),
                        email: String(email),
                        senha: String(senhaAntiga?.senha),
                        cpf: String(cpf),
                        especializacao: String(especializacao)
                    },
                    where: {
                        id: Number(id)
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true,
                        especializacao: true
                    }
                })

                return veterinarioUpdated
            } else {
                const novaSenha = await bcrypt.hash(senha, 6)
                const veterinarioUpdated = await prisma.veterinarios.update({
                    data: {
                        nome: String(nome),
                        email: String(email),
                        senha: String(novaSenha),
                        cpf: String(cpf),
                        especializacao: String(especializacao)
                    },
                    where: {
                        id: Number(id)
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true,
                        especializacao: true
                    }
                })
                return veterinarioUpdated
            }
        } catch (err) {
            const { id } = req.query
            const { email, cpf } = req.body


            const veterinarioNaoExiste = await prisma.veterinarios.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (!veterinarioNaoExiste) {
                throw new AppError(`Veterinário com ID ${id} não foi encontrado.`, 404)
            }

            const emailJaCadastrado = await prisma.veterinarios.findUnique({
                where: {
                    email: String(email)
                }
            })

            if (emailJaCadastrado) {
                throw new AppError(`Email ${email} já esta cadastrado.`, 409)
            }

            const cpfJaCadastrado = await prisma.veterinarios.findUnique({
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
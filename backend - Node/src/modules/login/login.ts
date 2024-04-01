import { sign } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";

type userRequest = {
    email: string;
    senha: string;
};

export class Login {
    async execute({ email, senha, }: userRequest) {

        const clientes = await prisma.clientes.findUnique({
            where: {
                email: String(email)
            }
        })
        const veterinarios = await prisma.veterinarios.findUnique({
            where: {
                email: String(email)
            }
        })

        if (!clientes) {
            if (!veterinarios) {
                throw new AppError('Email ou senha incorretos', 400)
            }
        } else {
            if (await bcrypt.compare(senha, clientes.senha)) {

                //@ts-ignore
                const token = sign({}, process.env.APP_SECRET, {
                    subject: clientes.email,
                    expiresIn: '1d'
                });


                let role: string = 'Cliente';

                if (clientes.rolesId == 2) {
                    role = String('Cliente')
                } else if (clientes.rolesId == 1) {
                    role = String('Veterinario')
                }

                const data = {
                    id: clientes.id,
                    email: clientes.email,
                    nome: clientes.nome,
                    role: role,
                    token,
                }

                return { data }

            } else {
                throw new AppError('Email ou senha incorretos', 400)
            }
        }


        if (!veterinarios) {
            throw new AppError('Email ou senha incorretos', 400)
        }

        if (await bcrypt.compare(senha, veterinarios.senha)) {

            //@ts-ignore
            const token = sign({}, process.env.APP_SECRET, {
                subject: veterinarios.email,
                expiresIn: '1y'
            });


            let role: string = 'veterinarios';

            if (veterinarios.rolesId == 2) {
                role = String('Veterinario')
            } else if (veterinarios.rolesId == 1) {
                role = String('Veterinario')
            }

            const data = {
                id: veterinarios.id,
                nome: veterinarios.nome,
                email: veterinarios.email,
                role: role,
                token,
            }

            return { data }

        } else {
            throw new AppError('Email ou senha incorretos', 400)
        }

    }
}

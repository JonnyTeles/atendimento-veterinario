import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";

export function roleVeterinario() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;

        const veterinario = await prisma.veterinarios.findUnique({
            where: {
                email: String(userEmail)
            },
            include: {
                Roles: {
                    select: {
                        role: true
                    }
                }
            }
        });

        if (!veterinario) {
            throw new AppError(`Não tem permissão.`, 401)
        }

        return next()
    }
}

export function roleCliente() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;

        const cliente = await prisma.clientes.findUnique({
            where: {
                email: String(userEmail)
            },
            include: {
                Roles: {
                    select: {
                        role: true
                    }
                }
            }
        });

        if (!cliente) {
            throw new AppError(`Não tem permissão.`, 401)
        }

        return next()
    }
}


export function onlyYour() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;

        const cliente = await prisma.clientes.findUnique({
            where: {
                email: String(userEmail),
            },
            include: {
                Roles: {
                    select: {
                        role: true
                    }
                }
            }
        });

        const veterinario = await prisma.veterinarios.findUnique({
            where: {
                email: String(userEmail),
            },
            include: {
                Roles: {
                    select: {
                        role: true
                    }
                }
            }
        });


        const { id } = req.query
        const clientes = await prisma.clientes.findUnique({
            where: {
                id: Number(id)
            }
        })
        const veterinarios = await prisma.veterinarios.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!cliente) {
            if (!veterinario) {
                throw new AppError(`Usuário com ID ${id} não encontrado.`, 404)
            }
        }

        if(veterinario){
            return next()
        }

        if (userEmail != clientes?.email) {
            if (userEmail != veterinarios?.email) {
                throw new AppError(`Não tem permissão.`, 401)
            }
        }
        return next();
    }
}

export function onlyYourDog() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;
        const { id } = req.query

        const cliente = await prisma.clientes.findUnique({
            where: {
                email: String(userEmail)
            },
            select: {
                id: true,
                Roles: {
                    select: {
                        role: true
                    }
                }
            }
        });

        const veterinario = await prisma.veterinarios.findUnique({
            where: {
                email: String(userEmail)
            }
        })

        const cachorro = await prisma.cachorros.findUnique({
            where: {
                id: Number(id)
            }
        })


        if (veterinario) {
            return next();
        }

        if (cachorro?.clienteId != cliente?.id) {
            throw new AppError(`Não tem permissão.`, 401)
        }

        return next();

    }

}


export function onlyYourAtendimento() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;
        const { id } = req.query

        const cliente = await prisma.clientes.findUnique({
            where: {
                email: String(userEmail)
            },
            include: {
                Roles: {
                    select: {
                        role: true
                    }
                }
            }
        });

        const veterinario = await prisma.veterinarios.findUnique({
            where: {
                email: String(userEmail)
            }
        })

        const atedimento = await prisma.atendimento.findUnique({
            where: {
                idAtendimento: Number(id)
            }
        })

        if (veterinario) {
            return next();
        }

        if (atedimento?.clienteId != cliente?.id) {
            throw new AppError(`Não tem permissão.`, 401)
        }

        return next()
    }

}
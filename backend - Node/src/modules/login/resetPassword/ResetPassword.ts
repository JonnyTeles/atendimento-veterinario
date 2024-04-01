import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import * as crypto from 'crypto'
import * as nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";

export class ResetPassword {
    async execute(req: Request) {
        const { email, cpf } = req.body

        const validClientEmail = await prisma.clientes.findFirst({
            where: {
                email: String(email),
                AND: {
                    cpf: String(cpf)
                }
            }
        })

        const validVetEmail = await prisma.veterinarios.findFirst({
            where: {
                email: String(email),
                AND: {
                    cpf: String(cpf)
                }
            }
        })

        if (!validClientEmail && !validVetEmail) {
            console.log(email, cpf);
            throw new AppError('Dados inválidos.', 400)
        }

        const passwordToken = crypto.randomBytes(4).toString('hex')

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                defaultLayout: false,
            },
            viewPath: './views',
        }));

        const mailOptions = {
            from: 'Clínica Pet <clinicapet.api@gmail.com>',
            to: email,
            subject: 'Redefinição de senha Clinica Pet',
            template: 'resetPassword',
            attachments: [
                {
                    filename: 'headerImg.png',
                    path: './img/headerImg.png',
                    cid: 'headerImg.png'
                },
                {
                    filename: 'facebook.png',
                    path: './img/facebook.png',
                    cid: 'facebook.png'
                },
                {
                    filename: 'github.png',
                    path: './img/github.png',
                    cid: 'github.png'
                },
                {
                    filename: 'linkedin.png',
                    path: './img/linkedin.png',
                    cid: 'linkedin.png'
                },
                {
                    filename: 'whatsapp.png',
                    path: './img/whatsapp.png',
                    cid: 'whatsapp.png'
                }
            ],
            context: {
                token: passwordToken,
                headerImg: 'cid:headerImg.png',
                facebookImg: 'cid:facebook.png',
                githubImg: 'cid:github.png',
                linkedinImg: 'cid:linkedin.png',
                whatsappImg: 'cid:whatsapp.png'
            }
        }

        await transporter.sendMail(mailOptions).then(() => {
            console.log('email send.');
        }).then(
            async () => {

                if (validClientEmail) {
                    await prisma.clientes.update({
                        data: {
                            passwordToken: String(passwordToken),
                        },
                        where: {
                            email: String(email),
                        }
                    })
                } else {
                    if (validVetEmail) {
                        await prisma.veterinarios.update({
                            data: {
                                passwordToken: String(passwordToken),
                            },
                            where: {
                                email: String(email),
                            }
                        })
                    }
                }

            }
        ).catch((err) => {
            console.log('err->>>>>>>>>>>>>', err);
            return
        })
    }
}
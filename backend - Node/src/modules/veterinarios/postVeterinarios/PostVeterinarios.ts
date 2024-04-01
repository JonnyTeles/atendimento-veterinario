import { Request } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars';


export class PostVeterinarios {
    async execute(req: Request) {
        const { nome, email, senha, cpf, especializacao } = req.body

        const emailJaCadastrado = await prisma.veterinarios.findUnique({
            where: {
                email: String(email)
            }
        })

        const emailJaCadastrado2 = await prisma.clientes.findUnique({
            where: {
                email: String(email)
            }
        })

        if (emailJaCadastrado || emailJaCadastrado2) {
            throw new AppError(`Email ${email} já cadastrado.`, 409)
        }

        const cpfJaCadastrado = await prisma.veterinarios.findUnique({
            where: {
                cpf: String(cpf)
            }
        })
        if (cpfJaCadastrado) {
            throw new AppError(`CPF ${cpf} já cadastrado.`, 409)
        }

        const passwordHash = await bcrypt.hash(senha, 6);

        const veterianrio = await prisma.veterinarios.create({
            data: {
                nome: String(nome),
                email: String(email),
                senha: passwordHash,
                cpf: String(cpf),
                especializacao: String(especializacao),
                rolesId: 1
            },
            select:{
                nome: true,
                email: true,
                cpf: true,
                especializacao: true,
                Roles: true
            }
        })

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
            to: veterianrio.email,
            subject: 'Boas vindas a Clinica Pet',
            template: 'novoVeterinario',
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
                clienteCriado: veterianrio.nome,
                headerImg: 'cid:headerImg.png',
                facebookImg: 'cid:facebook.png',
                githubImg: 'cid:github.png',
                linkedinImg: 'cid:linkedin.png',
                whatsappImg: 'cid:whatsapp.png'
            }
        }

        await transporter.sendMail(mailOptions).then(() => {
            console.log('email send.');

        }).catch((err) => {
            console.log('err->>>>>>>>>>>>>', err);
            return veterianrio
        });

        return veterianrio

    }
}
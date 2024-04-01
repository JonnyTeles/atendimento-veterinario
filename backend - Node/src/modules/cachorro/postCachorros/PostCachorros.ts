import axios from "axios";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class PostCachorros {
    async execute(req: Request, res: Response) {
        const { nome, sexo, cor, idade, peso, clienteId, racaId } = req.body

        const raca = await axios.get(`https://api.thedogapi.com/v1/breeds/${racaId}?api_key=461e06fd-c361-4327-ba81-bee2f3a34c31`).then(function (resposta) {
            if (Number(racaId) >= 265 || Number(racaId) < 0) {
                throw new AppError(`Raça com ID ${racaId} não encontrada.`, 404)
            }
            
            if(racaId == 0){
                const viraLata = '{"id": 0, "name": "Vira-Lata", "life_span": "15 anos"}'
                const obj = JSON.parse(viraLata)
                resposta.data = obj
            }
            return resposta.data
        })

        const tutorExiste = await prisma.clientes.findUnique({
            where: {
                id: Number(clienteId)
            }
        })

        if (!tutorExiste) {
            throw new AppError(`Tutor com id ${clienteId} não existe.`, 400)
        }
        const cachorro = await prisma.cachorros.create({
            data: {
                nome: String(nome),
                raca: raca,
                sexo: String(sexo),
                cor: String(cor),
                idade: Number(idade),
                peso: Number(peso),
                clienteId: clienteId
            }
        })
        return cachorro
    }
}
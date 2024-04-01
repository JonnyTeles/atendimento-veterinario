import axios from 'axios';
import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';


export const getRacasPorNome = {
    async getRacasPorNome(req: Request, res: Response) {
        const { name } = req.params;

        await axios.get('https://api.thedogapi.com/v1/breeds/search?api_key=461e06fd-c361-4327-ba81-bee2f3a34c31&q=' + name).then(function (resposta) {

            if (resposta.data[0] == null) {
                throw new AppError(`Raça ${name} não encontrada`)
            }
            return res.json(resposta.data).status(200)

        }).catch((err) => {
            throw new AppError(`Erro ao consultar TheDogAPI.`, 500), err
        })
    }
}

export const getTodasRacas = {
    async getTodasRacas(req: Request, res: Response) {
        await axios.get('https://api.thedogapi.com/v1/breeds/?api_key=461e06fd-c361-4327-ba81-bee2f3a34c31').then(function (resposta) {
            return res.json(resposta.data).status(200)
        }).catch((err) => {
            throw new AppError(`Erro ao consultar TheDogApi.`, 500), err
        })
    }
}

export const getRacasPorId = {
    async getRacasPorId(req: Request, res: Response) {
        const { id } = req.params;
        await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=461e06fd-c361-4327-ba81-bee2f3a34c31`).then(function (resposta) {
        if(Number(id) >= 265 || Number(id) < 1){
            throw new AppError(`Raça com ID ${id} não encontrada.`, 404)
        }
        return res.json(resposta.data).status(200)

        }).catch((err) => {
            throw new AppError(`Erro ao consultar TheDogAPI.`, 500), err
        })
    }
}
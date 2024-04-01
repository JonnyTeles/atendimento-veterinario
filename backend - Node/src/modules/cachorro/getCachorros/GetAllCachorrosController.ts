import { Request, Response } from "express";
import { GetAllCachorros } from "./GetAllCachorros";

export class GetAllCachorrosController {
    async handle(req: Request, res: Response) {
        const getAllCachorros = new GetAllCachorros();

        const result = await getAllCachorros.execute();

        return res.json(result).status(200)
    }
}
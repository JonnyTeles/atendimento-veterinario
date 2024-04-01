import { Request, Response } from "express";
import { UpdateCachorros } from "./UpdateCachorros";

export class UpdateCachorrosController {
    async handle(req: Request, res: Response) {
        const updateCachorros = new UpdateCachorros();

        const result = await updateCachorros.execute(req);

        return res.json(result).status(200)
    }
}
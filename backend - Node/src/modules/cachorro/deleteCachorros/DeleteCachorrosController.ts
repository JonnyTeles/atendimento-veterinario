import { Request, Response } from "express";
import { DeleteCachorros } from "./DeleteCachorros";

export class DeleteCachorrosController{
    async handle(req: Request, res: Response){
        const deleteCachorros = new DeleteCachorros();

        const result = await deleteCachorros.execute(req);

        return res.json(result).status(200)
    }
}
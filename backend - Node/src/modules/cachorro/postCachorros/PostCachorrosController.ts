import { Request, Response } from "express";
import { PostCachorros } from "./PostCachorros";

export class PostCachorrosController {
    async handle(req: Request, res: Response) {
        const postCachorros = new PostCachorros();

        const result = await postCachorros.execute(req, res);

        return res.json(result).status(200)
    }
}
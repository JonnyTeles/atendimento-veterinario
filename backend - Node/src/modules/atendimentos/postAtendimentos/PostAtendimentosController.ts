import { Request, Response } from "express";
import { PostAtendimentos } from "./PostAtendimentos";

export class PostAtendimentosController{
    async handle(req: Request, res: Response){
        const postAtendimentos = new PostAtendimentos();

        const result = await postAtendimentos.execute(req);

        return res.json(result).status(200)
    }
}
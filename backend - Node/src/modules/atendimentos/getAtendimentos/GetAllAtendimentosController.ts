import { Request, Response } from "express";
import { GetAllAtendimentos } from "./GetAllAtendimentos";

export class GetAllAtendimentosController{
    async handle(req: Request, res: Response){
        const getAllAtendimentos = new GetAllAtendimentos();

        const result = await getAllAtendimentos.execute(req);

        return res.json(result).status(200)
    }
}
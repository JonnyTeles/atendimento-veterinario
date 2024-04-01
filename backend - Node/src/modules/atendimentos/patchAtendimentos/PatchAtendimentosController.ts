import { Request, Response } from "express";
import { PatchAtendimentos } from "./PatchAtendimentos";

export class PatchAtendimentosController{
    async handle(req: Request, res: Response){
        const patchAtendimentos = new PatchAtendimentos();

        const result = await patchAtendimentos.execute(req);

        return res.json(result).status(200)
    }
}
import { Request, Response } from "express";
import { GetAtendimentoPorId } from "./GetAtendimentoPorId";

export class GetAtendimentosPorIdController{
    async handle(req: Request, res: Response){
        const getAtendimentosporId = new GetAtendimentoPorId

        const result = await getAtendimentosporId.execute(req)

        return res.json(result).status(200)
    }
}
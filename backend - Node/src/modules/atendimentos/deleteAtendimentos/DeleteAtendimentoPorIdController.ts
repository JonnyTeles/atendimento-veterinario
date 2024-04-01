import { Request, Response } from "express";
import { deleteAtendimentosPorId } from "./deleteAtendimentosPorId";

export class DeleteAtendimentoPorIdController{
    async handle(req: Request, res: Response){
        const deleteAtendimento = new deleteAtendimentosPorId();

        const result = await deleteAtendimento.execute(req);

        return res.json(result).status(200)
    }
}
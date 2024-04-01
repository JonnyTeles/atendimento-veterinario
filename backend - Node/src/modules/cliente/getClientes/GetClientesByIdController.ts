import { Request, Response } from "express";
import { GetClientesById } from "./GetClientesByid";

export class GetClientesByIdController {
    async handle(req: Request, res: Response) {
        const getClientesById = new GetClientesById();

        const result = await getClientesById.execute(req, res);

        return res.json(result).status(200)
    }
}
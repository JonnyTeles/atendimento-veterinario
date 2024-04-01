import { Request, Response } from "express";
import { GetAllClientes } from "./GetAllClientes";

export class GetAllClientesController {
    async handle(req: Request,res: Response) {
        const getAllClientes = new GetAllClientes();

        const result = await getAllClientes.execute();

        return res.json(result).status(200)
    }
}
import { Request, Response } from "express";
import { UpdateClientes } from "./UpdateClientes";

export class UpdateClientesController {
    async handle(req: Request, res: Response) {
        const updateClientes = new UpdateClientes();

        const result = await updateClientes.execute(req);

        return res.json(result).status(200)
    }
}
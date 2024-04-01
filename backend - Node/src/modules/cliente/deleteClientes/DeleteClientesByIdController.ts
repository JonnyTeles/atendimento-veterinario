import { Request, Response } from "express";
import { DeleteClientesById } from "./DeleteClientesById";

export class DeleteClientesByIdController {
    async handle(req: Request, res: Response) {
        const deleteCliente = new DeleteClientesById();

        const result = await deleteCliente.execute(req);

        return res.json(result).status(200)
    }
}
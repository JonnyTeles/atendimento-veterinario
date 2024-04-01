import { Request, Response } from "express";
import { DeleteVeterinariosById } from "./DeleteVeterinariosById";

export class DeleteVeterinariosByIdController {
    async handle(req: Request, res: Response) {
        const deleteVeterinario = new DeleteVeterinariosById();

        const result = await deleteVeterinario.execute(req);

        return res.status(200).json(result)
    }
}
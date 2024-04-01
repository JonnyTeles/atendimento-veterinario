import { Request, Response } from "express";
import { GetVeterinariosById } from "./GetVeterinariosById";

export class GetVeterinariosByIdController {
    async handle(req: Request, res: Response) {
        const getVeterinariosById = new GetVeterinariosById();

        const result = await getVeterinariosById.execute(req);

        return res.json(result).status(200)
    }
}
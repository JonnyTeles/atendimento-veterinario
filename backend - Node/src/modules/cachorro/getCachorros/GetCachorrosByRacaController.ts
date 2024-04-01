import { Request, Response } from "express";
import { GetCachorrosByRaca } from "./GetCachorrosByRaca";

export class GetCachorrosByRacaController {
    async handle(req: Request, res: Response) {
        const getCachorrosByRaca = new GetCachorrosByRaca();

        const result = await getCachorrosByRaca.execute(req);

        return res.json(result).status(200)
    }
}
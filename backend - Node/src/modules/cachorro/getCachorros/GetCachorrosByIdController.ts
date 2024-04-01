import { Request, Response } from "express";
import { GetCachorosById } from "./GetCachorrosById";

export class GetCachorosByIdController {
    async handle(req: Request, res: Response) {
        const getCachorrosById = new GetCachorosById();

        const result = await getCachorrosById.execute(req);

        return res.json(result).status(200)
    }
}
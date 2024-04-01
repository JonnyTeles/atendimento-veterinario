import { Request, Response } from "express";
import { ValidToken } from "./ValidToken";

export class ValidTokenController {
    async handle(req: Request, res: Response) {
        const validToken = new ValidToken()

        const result = await validToken.execute(req, res)

        return res.json(result).status(200)

    }
}
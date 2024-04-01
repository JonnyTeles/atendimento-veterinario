import { Request, Response } from "express";
import { PostVeterinarios } from "./PostVeterinarios";

export class PostVeterinariosController {
    async handle(req: Request, res: Response) {
        const postVeterinarios = new PostVeterinarios();

        const result = await postVeterinarios.execute(req);

        return res.status(200).send(result).json()
    }
}
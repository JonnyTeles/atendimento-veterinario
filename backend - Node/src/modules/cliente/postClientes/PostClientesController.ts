import { Request, Response } from "express";
import { PostClientes } from "./PostClientes";

export class PostClientesController {
    async handle(req: Request, res: Response) {

        const postClientes = new PostClientes();

        const result = await postClientes.execute(req);

        return res.json(result).status(200)
    }
}
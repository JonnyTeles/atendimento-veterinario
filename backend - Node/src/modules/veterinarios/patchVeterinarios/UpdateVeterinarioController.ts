import { Request, Response } from "express";
import { UpdateVeterinarios } from "./UpdateVeterinarios";

export class UpdateVeterinarioController{
    async handle(req: Request, res: Response){
        const updateVeterinario = new UpdateVeterinarios();

        const result = await updateVeterinario.execute(req);

        return res.status(200).send(result).json();
    }
}
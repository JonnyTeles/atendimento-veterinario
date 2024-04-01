import { Request, Response } from "express";
import { GetAllVeterinarios } from "./GetAllVeterinarios";

export class GetAllVeterinariosController{
    async handle(req: Request, res: Response){
        const getAllVeterinarios = new GetAllVeterinarios();

        const result = await getAllVeterinarios.execute();

        return res.json(result).status(200)
    }
}
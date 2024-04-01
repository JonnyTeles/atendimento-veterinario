import { Request, Response } from "express";
import { Login } from "./login";

export class LoginController{
    async handle(req: Request, res: Response){
        const {email, senha} = req.body;

        const login = new Login();
        const result = await login.execute({email, senha});

        return res.json(result).status(200)
    }
}
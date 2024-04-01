import { Request, Response } from "express";
import { ResetPassword } from './ResetPassword';

export class ResetPasswordController{
    async handle(req: Request, res: Response){
        const resetPassword = new ResetPassword()

        const result = await resetPassword.execute(req)

        return res.json(result).status(200)
    }
}
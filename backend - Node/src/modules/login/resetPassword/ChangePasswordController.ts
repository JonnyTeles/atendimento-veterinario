import { Request, Response } from "express";
import { ChangePassword } from './ChangePassword';

export class ChangePasswordController {
    async handle(req: Request, res: Response) {
        const changePassword = new ChangePassword();

        const result = await changePassword.execute(req);

        return res.json(result).status(200)
    }
}
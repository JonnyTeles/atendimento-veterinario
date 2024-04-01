import { NextFunction, Request, Response } from "express"
import { decode, verify } from 'jsonwebtoken'
import { AppError } from "../errors/AppError"

export const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            throw new AppError(`Token de autorização necessário.`, 401)
        }

        const [, token] = authHeader.split(' ')

        try {
            //@ts-ignore
            verify(token, process.env.APP_SECRET);

            //@ts-ignore
            const { sub } = decode(token);
            req.userEmail = sub.toString();

            return next();

        } catch (error) {
            throw new AppError('Token inválido', 401)
        }
    }
}
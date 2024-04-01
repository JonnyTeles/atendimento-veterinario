import express, { NextFunction } from 'express';
import logger from 'morgan';
import { Request, Response } from "express-serve-static-core";
import "express-async-errors"
import { AppError } from './modules/errors/AppError';
import { routes } from './modules/routes';
import cors from 'cors'


const app = express()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError ) {
        return response.status(err.statusCode).json({
            status: "Error",
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error -  ${err.message}`
    })
})

app.listen(3000, () => console.log('API Atendimento veterinário rodando na porta 3000...🚀'));
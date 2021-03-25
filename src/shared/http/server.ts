import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routs';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

// Tratamento de Erro
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('error :>> ', error);

    if (error instanceof AppError)
        return res.status(error.statusCode).json({
            status: 'error',
            msg: error.message,
        });

    return res.status(500).json({
        status: 'error',
        msg: 'Internal server error',
    });
});

app.listen(3000, () => {
    console.log('Servidor Iniciado na porta 3000!');
});

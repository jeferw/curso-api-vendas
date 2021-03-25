import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
    userName: string;
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('JWT Token não encontrado!');

    const [_, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);

        const { userName, sub } = decodeToken as ITokenPayload;

        request.user = {
            id: sub,
            name: userName,
        };

        return next();
    } catch {
        throw new AppError('JWT Token inválido!');
    }
}

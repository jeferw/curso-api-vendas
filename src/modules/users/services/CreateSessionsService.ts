import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findByEmail(email);

        if (!user) throw new AppError('Email e senha incorretos!', 401);

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed)
            throw new AppError('Email e senha incorretos!', 401);

        const token = sign({ userName: user.name }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        const userResponse: IResponse = {
            user,
            token,
        };

        return userResponse;
    }
}

export default CreateSessionsService;

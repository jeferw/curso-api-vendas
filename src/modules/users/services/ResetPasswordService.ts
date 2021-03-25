import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) throw new AppError('Token não encontrado!');

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) throw new AppError('Usuário não encontrado!');

        const compareDate = addHours(userToken.created_at, 2);

        if (isAfter(Date.now(), compareDate))
            throw new AppError('Token expirado!');

        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}

export default ResetPasswordService;

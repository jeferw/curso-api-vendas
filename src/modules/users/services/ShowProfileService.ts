import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    userId: string;
}

class ShowProfileService {
    public async execute({ userId }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findById(userId);

        if (!user) throw new AppError('Usuário não encontrado!', 401);

        return user;
    }
}

export default ShowProfileService;

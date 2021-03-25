import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    password?: string;
    oldPassword?: string;
}

class UpdateProfileService {
    public async execute({
        userId,
        name,
        email,
        password,
        oldPassword,
    }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findById(userId);

        if (!user) throw new AppError('Usuário não encontrado!', 401);

        const usertExists = await userRepository.findByEmail(email);

        if (usertExists && usertExists.id !== user.id)
            throw new AppError('Já existe um usuário com esse e-mail!');

        if (password && !oldPassword)
            throw new AppError('É necessário informar a senha antiga!');

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);

            if (!checkOldPassword)
                throw new AppError('Senha antiga incorreta!');

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;

import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customerExists = await customerRepository.findByEmail(email);

        if (customerExists)
            throw new AppError('Já existe um cliente com esse e-mail!');

        const customer = customerRepository.create({
            name,
            email,
        });

        await customerRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;

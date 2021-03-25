import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        if (!customer) throw new AppError('Cliente não encontrado!');

        const customerExists = await customersRepository.findByName(email);

        if (customerExists && customerExists.id !== customer.id)
            throw new AppError('Já existe um cliente com esse email!');

        customer.name = name;
        customer.email = email;

        await customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;

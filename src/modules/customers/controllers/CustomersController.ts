import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListUserService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listCustomer = new ListCustomerService();

        const customer = await listCustomer.execute();

        return response.json(customer);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCustomer = new ShowCustomerService();

        const customer = await showCustomer.execute({ id });

        return response.json(customer);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;

        const createCustomer = new CreateCustomerService();

        const customer = await createCustomer.execute({ name, email });

        return response.json(customer);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, email } = request.body;

        const updateProduct = new UpdateCustomerService();

        const customer = await updateProduct.execute({
            id,
            name,
            email,
        });

        return response.json(customer);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({ id });

        return response.status(204).json();
    }
}
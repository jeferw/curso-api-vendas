import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) throw new AppError('Produto não encontrado!');

        const productExists = await productsRepository.findByName(name);

        if (productExists && productExists.id !== product.id)
            throw new AppError('Já existe um produto com esse nome!');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
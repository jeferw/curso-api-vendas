import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProduct {
    id: string;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findAllByIds(products: IFindProduct[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const existsProducts = await this.find({
            where: { id: In(productIds) },
        });

        return existsProducts;
    }
}

export default ProductRepository;

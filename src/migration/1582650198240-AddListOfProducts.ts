import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Product } from '../entity/product';

export class AddListOfProducts1582650198240 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		let product = new Product();
		product.name = 'Пицца Маргарита';
		product.category = 'Пицца';
		const productRepository = getRepository(Product);
		await productRepository.save(product);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

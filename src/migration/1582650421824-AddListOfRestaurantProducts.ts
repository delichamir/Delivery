import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Restaurant_product } from '../entity/restaurant_product';

export class AddListOfRestaurantProducts1582650421824
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		let product = new Restaurant_product();

		product.product_id = 1;
		product.price = 300;
		product.count = 10;

		const productRepository = getRepository(Restaurant_product);
		await productRepository.save(product);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Menu } from '../entity/menu';

export class AddListOfMenu1582650959419 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		let menu = new Menu();
		menu.restaurant_id = 1;
		menu.restaurant_product_id = 1;

		const userRepository = getRepository(Menu);
		await userRepository.save(menu);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

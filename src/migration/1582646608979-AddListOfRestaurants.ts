import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Restaurant } from '../entity/restaurant';

export class AddListOfRestaurants1582646608979 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		let restaurant = new Restaurant();
		restaurant.name = 'Додо Пицца';
		restaurant.address = 'г.Москва, 1-я ул. Машиностроения, 10';
		restaurant.phone = '88003330060';
		restaurant.menu_id = 1;
		const userRepository = getRepository(Restaurant);
		await userRepository.save(restaurant);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

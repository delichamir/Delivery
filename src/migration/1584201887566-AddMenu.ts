import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Menu } from '../entity/menu';

export class AddMenu1584201887566 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		const menuRepository = getRepository(Menu);

		let menu = new Menu();
		menu.name = 'Основное меню Додо Пиццы';
		menu.restaurant_id;
		await menuRepository.save(menu);

		let menu2 = new Menu();
		menu2.name = "Основное меню Домино'с пиццы";
		await menuRepository.save(menu2);

		let menu3 = new Menu();
		menu3.name = 'Основное меню Папа Джонса';
		await menuRepository.save(menu3);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

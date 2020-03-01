import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Menu } from '../entity/menu';

export class AddMenu1583061029460 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		const userRepository = getRepository(Menu);

		let menu = new Menu();
		menu.name = 'Основное меню Додо Пиццы';
		await userRepository.save(menu);

		let menu2 = new Menu();
		menu2.name = "Основное меню Домино'с пиццы";
		await userRepository.save(menu2);

		let menu3 = new Menu();
		menu3.name = 'Основное меню Папа Джонса';
		await userRepository.save(menu3);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

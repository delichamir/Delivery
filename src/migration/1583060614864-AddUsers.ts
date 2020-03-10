import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Client } from '../entity/client';

export class AddUsers1583060614864 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		const userRepository = getRepository(Client);

		// Adding users
		let user = new Client();
		user.full_name = 'admin';
		user.password = 'admin';
		user.phone = '71111111111';
		user.hashPassword();
		user.role = 'ADMIN';
		user.email = 'admin@delivery.com';
		await userRepository.save(user);

		let user2 = new Client();
		user2.full_name = 'user2';
		user2.password = 'pass';
		user2.phone = '72222222222';
		user2.hashPassword();
		user2.role = 'CUSTOMER';
		user2.email = 'user2@delivery.com';
		await userRepository.save(user2);

		let user3 = new Client();
		user3.full_name = 'user3';
		user3.password = 'pass';
		user3.phone = '73333333333';
		user3.hashPassword();
		user3.role = 'CUSTOMER';
		user3.email = 'user3@delivery.com';
		await userRepository.save(user3);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

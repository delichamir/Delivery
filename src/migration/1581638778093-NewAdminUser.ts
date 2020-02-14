import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Client } from '../entity/client';

export class NewAdminUser1581638778093 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		let user = new Client();
		user.full_name = 'admin';
		user.password = 'admin';
		user.hashPassword();
		user.role = 'ADMIN';
		user.email = 'admin@delivery.com';
		const userRepository = getRepository(Client);
		await userRepository.save(user);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['full_name'])
export class Client {
	@PrimaryGeneratedColumn()
	client_id: number;

	@Column()
	@Length(4, 20)
	full_name: string;

	@Column()
	@Length(4, 100)
	password: string;

	@Column()
	@IsNotEmpty()
	role: string;

	@Column()
	email: string;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfUnencryptedPasswordIsValid(
		Login: string,
		unencryptedPassword: string
	) {
		if (
			bcrypt.compareSync(Login, this.full_name) &&
			bcrypt.compareSync(unencryptedPassword, this.password)
		) {
			return true;
		}
		return false;
	}
}

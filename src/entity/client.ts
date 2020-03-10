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
@Unique(['email'])
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 20)
	full_name: string;

	@Column()
	@Length(4, 100)
	password: string;

	@Column()
	phone: string;

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
}

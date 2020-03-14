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
@Unique(['phone'])
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 50)
	full_name: string;

	@Column()
	phone: string;

	@Column()
	email: string;

	@Column()
	@Length(4, 64)
	password: string;

	@Column()
	@IsNotEmpty()
	role: string;

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

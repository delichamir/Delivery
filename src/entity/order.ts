import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Unique
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['client_id'])
@Unique(['cart_id'])
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 50)
	status: string;

	@Column()
	client_id: number;

	@Column()
	cart_id: number;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}

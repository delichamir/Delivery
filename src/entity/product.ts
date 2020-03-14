import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['menu_id'])
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 50)
	name: string;

	@Column()
	@Length(4, 50)
	category: string;

	@Column()
	count: number;

	@Column()
	price: number;

	@Column()
	menu_id: number;
}

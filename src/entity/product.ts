import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	product_id: number;

	@Column()
	name: string;

	@Column()
	category: string;

	@Column()
	count: number;

	@Column()
	price: number;

	@Column()
	menu_id: number;
}

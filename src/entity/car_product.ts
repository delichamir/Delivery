import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['cart_id', 'product_id'])
export class Cart_product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	cart_id: number;

	@Column()
	product_id: number;

	@Column()
	quantity: number;
}

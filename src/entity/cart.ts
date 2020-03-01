import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
	@PrimaryGeneratedColumn()
	cart_id: number;

	@Column()
	amount: number;

	@Column()
	client_id: number;

	@Column()
	product_id: number;
}

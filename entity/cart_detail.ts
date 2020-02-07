import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart_detail {
	@PrimaryGeneratedColumn()
	cart_detail_id: number;

	@Column()
	client_id: number;

	@Column()
	restaurant_product_id: number;
}

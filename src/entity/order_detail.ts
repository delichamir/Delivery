import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order_detail {
	@PrimaryGeneratedColumn()
	order_detail_id: number;

	@Column()
	cart_id: number;
}

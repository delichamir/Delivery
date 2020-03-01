import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	order_id: number;

	@Column()
	status: string;

	@Column()
	client_id: number;

	@Column()
	order_detail_id: number;
}

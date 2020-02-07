import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn()
	restaurant_id: number;

	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	phone: number;

	@Column()
	menu_id: number;
}

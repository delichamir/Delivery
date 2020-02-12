import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn()
	restaurant_id: number;

	@Column('char varying')
	name: string;

	@Column('char varying')
	address: string;

	@Column('int32')
	phone: number;

	@Column('int32')
	menu_id: number;
}

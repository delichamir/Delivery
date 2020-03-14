import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 50)
	name: string;

	@Column()
	@Length(4, 100)
	address: string;

	@Column()
	phone: string;
}

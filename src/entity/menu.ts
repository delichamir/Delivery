import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['restaurant_id'])
export class Menu {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 50)
	name: string;

	@Column()
	restaurant_id: number;
}

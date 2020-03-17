import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	OneToMany
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import { Product } from './product';

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

	// @OneToMany(
	// 	type => Product,
	// 	product => product.menu
	// )
	// product: Product[];
}

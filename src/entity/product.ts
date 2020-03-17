import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	ManyToOne
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import { Menu } from './menu';

@Entity()
@Unique(['menu_id'])
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 50)
	name: string;

	@Column()
	@Length(4, 50)
	category: string;

	@Column()
	count: number;

	@Column()
	price: number;

	@Column()
	menu_id: number;

	// @ManyToOne(
	// 	type => Menu,
	// 	menu => menu.id
	// )
	// menu_id: Menu;
}

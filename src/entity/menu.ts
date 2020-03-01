import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Menu {
	@PrimaryGeneratedColumn()
	menu_id: number;

	@Column()
	name: string;
}

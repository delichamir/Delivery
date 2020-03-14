import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Unique
} from 'typeorm';

@Entity()
@Unique(['client_id'])
export class Cart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	client_id: number;

	@Column()
	amount: number;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}

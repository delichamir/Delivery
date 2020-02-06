import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column()
  client_id: number;

  @Column()
  cart_detail_id: number;
}

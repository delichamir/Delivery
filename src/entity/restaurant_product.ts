import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Restaurant_product {
  @PrimaryGeneratedColumn()
  restaurant_product_id: number;

  @Column()
  count: number;

  @Column()
  price: number;

  @Column()
  product_id: number;
}

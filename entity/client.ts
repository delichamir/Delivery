import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  login: number;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  reg_data: Date;
}

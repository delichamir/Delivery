import { MigrationInterface, QueryRunner } from 'typeorm';

export class start1583060394070 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		// Create new tables

		// Client
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "client" (
      "id" SERIAL NOT NULL PRIMARY KEY,
			"full_name" VARCHAR(20),
			"phone" VARCHAR(20) DEFAULT NULL, 
			"email" VARCHAR(20),
      "password" VARCHAR(100),
      "role" VARCHAR(20) NULL DEFAULT 'CUSTOMER',
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			CREATE UNIQUE INDEX uq__client__email ON client (email);
      )`);

		// Restaurant
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "restaurant" (
      "id" SERIAL NOT NULL PRIMARY KEY,
      "name" VARCHAR(20) DEFAULT NULL,
      "address" VARCHAR(40) DEFAULT NULL,
      "phone" VARCHAR(20) DEFAULT NULL,
      )`);

		// Product
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "product" (
      "id" SERIAL NOT NULL PRIMARY KEY,
      "name" VARCHAR(20) DEFAULT NULL,
			"category" VARCHAR(20) DEFAULT NULL,
			"count" INT DEFAULT 1,
			"price" VARCHAR(20) DEFAULT 0,
			"menu_id" INTEGER REFERENCES menu(id),
			CREATE UNIQUE INDEX uq__product__menu_id ON product (menu_id);
			)`);

		// Menu
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "menu" (
			"id" SERIAL NOT NULL PRIMARY KEY,
			"name" VARCHAR(20) DEFAULT NULL,
			"restaurant_id" INTEGER REFERENCES restaurant(id),
			CREATE UNIQUE INDEX uq__menu__restaurant_id ON menu (restaurant_id);
      )`);

		// Cart_product
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "cart_product" (
      "id" SERIAL NOT NULL PRIMARY KEY,
      "cart_id" INTEGER REFERENCES cart(id),
			"product_id" INTEGER REFERENCES product(id),
			CREATE UNIQUE INDEX uq__cart_product__product_id ON cart_product (product_id);
			CREATE UNIQUE INDEX uq__cart_product__cart_id ON cart_product (cart_id);
      )`);

		// Cart
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "cart" (
      "id" SERIAL NOT NULL PRIMARY KEY,
			"client_id" INTEGER REFERENCES client(id),
			"amount" VARCHAR(20) DEFAULT 0,
			CREATE UNIQUE INDEX uq__cart__client_id ON menu (client_id);
      )`);

		// Order
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "order" (
      "id" SERIAL NOT NULL PRIMARY KEY,
      "status" INT DEFAULT NULL,
			"client_id" INTEGER REFERENCES client(id),
			"cart_id" INTEGER REFERENCES cart(id),
			"cart_product_id" INTEGER REFERENCES cart_product(id),
			CREATE UNIQUE INDEX uq__cart__client_id ON order (client_id);
			CREATE UNIQUE INDEX uq__cart__cart_id ON order (cart_id);
			CREATE UNIQUE INDEX uq__cart__product_id ON order (cart_product_id);
      )`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		// Drop all tables
		await queryRunner.query(`DROP TABLE  "order"`);
		await queryRunner.query(`DROP TABLE  "cart"`);
		await queryRunner.query(`DROP TABLE  "cart_product"`);
		await queryRunner.query(`DROP TABLE  "menu"`);
		await queryRunner.query(`DROP TABLE  "product"`);
		await queryRunner.query(`DROP TABLE  "restaurant"`);
		await queryRunner.query(`DROP TABLE  "clinet"`);
	}
}

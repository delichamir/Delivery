import { MigrationInterface, QueryRunner } from 'typeorm';

export class dump1580912108354 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		// Create new tables with info

		// Create table client
		await queryRunner.query(`CREATE TABLE "client" (
      "client_id" SERIAL,
      "full_name" VARCHAR(20) DEFAULT NULL,
      "password" VARCHAR(100) DEFAULT NULL,
      "role" VARCHAR() NOT NULL,
      "email" VARCHAR(20) DEFAULT NULL,
      "createdAt" TIMESTAMP NULL DEFAULT NULL,
      "updatedAt" TIMESTAMP NULL DEFAULT NULL,
      PRIMARY KEY ("client_id") )`);

		// Create table restaurant
		await queryRunner.query(`CREATE TABLE "restaurant" (
      "restaurant_id" SERIAL,
      "name" VARCHAR(20) DEFAULT NULL,
      "address" VARCHAR(40) DEFAULT NULL,
      "phone" VARCHAR(20) DEFAULT NULL,
      "menu_id" INT DEFAULT NULL,
      PRIMARY KEY ("restaurant_id"),
      FOREIGN KEY ("menu_id") REFERENCES menu("menu_id") )`);

		// Create table product
		await queryRunner.query(`CREATE TABLE "product" (
      "product_id" SERIAL,
      "name" VARCHAR(20) DEFAULT NULL,
      "category" VARCHAR(20) DEFAULT NULL,
      PRIMARY KEY ("product_id") )`);

		// Create table restaurant_product
		await queryRunner.query(`CREATE TABLE "restaurant_product" (
      "restaurant_product_id" SERIAL,
      "count" NUMERIC DEFAULT NULL,
      "price" FLOAT DEFAULT NULL,
      "product_id" INT NOT NULL,
      PRIMARY KEY ("restaurant_product_id"),
      FOREIGN KEY ("product_id") REFERENCES product("product_id") )`);

		// Create table cart_detail
		await queryRunner.query(`CREATE TABLE "cart_detail" (
      "cart_detail_id" SERIAL,
      "client_id" INT DEFAULT NULL,
      "restaurant_product_id" INT DEFAULT NULL,
      PRIMARY KEY ("cart_detail_id"),
      FOREIGN KEY ("client_id") REFERENCES client("client_id"),
      FOREIGN KEY ("restaurant_product_id") REFERENCES restaurant_product("restaurant_product_id") )`);

		// Create table cart
		await queryRunner.query(`CREATE TABLE "cart" (
      "cart_id" SERIAL,
      "client_id" INT DEFAULT NULL,
      "cart_detail_id" INT DEFAULT NULL,
      PRIMARY KEY ("cart_id"),
      FOREIGN KEY ("cart_detail_id") REFERENCES cart_detail("cart_detail_id") )`);

		// Create table menu
		await queryRunner.query(`CREATE TABLE "menu" (
      "menu_id" SERIAL,
      "restaurant_product_id" INT DEFAULT NULL,
      PRIMARY KEY ("menu_id"),
      FOREIGN KEY ("restaurant_product_id") REFERENCES restaurant_product("restaurant_product_id") )`);

		// Create table order_detail
		await queryRunner.query(`CREATE TABLE "order_detail" (
      "order_detail_id" SERIAL,
      "amount" FLOAT DEFAULT NULL,
      "restaurant_id" INT DEFAULT NULL,
      "cart_id" INT DEFAULT NULL,
      PRIMARY KEY ("order_detail_id"),
      FOREIGN KEY ("restaurant_id") REFERENCES restaurant("restaurant_id"),
      FOREIGN KEY ("cart_id") REFERENCES cart("cart_id") )`);

		// Create table order
		await queryRunner.query(`CREATE TABLE "order" (
      "order_id" SERIAL,
      "status" INT DEFAULT NULL,
      "order_detail_id" INT DEFAULT NULL,
      PRIMARY KEY ("order_id"),
      FOREIGN KEY ("order_detail_id") REFERENCES order_detail("order_detail_id") )`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		// Drop all tables
		await queryRunner.query(`DROP TABLE  "clinet"`);
		await queryRunner.query(`DROP TABLE  "restaurant"`);
		await queryRunner.query(`DROP TABLE  "product"`);
		await queryRunner.query(`DROP TABLE  "restaurant_product"`);
		await queryRunner.query(`DROP TABLE  "cart_detail"`);
		await queryRunner.query(`DROP TABLE  "cart"`);
		await queryRunner.query(`DROP TABLE  "order_detail"`);
		await queryRunner.query(`DROP TABLE  "menu"`);
		await queryRunner.query(`DROP TABLE  "order"`);
	}
}

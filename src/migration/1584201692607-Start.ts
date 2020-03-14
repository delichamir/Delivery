import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1584201692607 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		// Client
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "client" (
		    "id" SERIAL NOT NULL PRIMARY KEY,
		    "full_name" VARCHAR(50) NOT NULL,
			"phone" VARCHAR(20) NOT NULL,
			"email" VARCHAR(128) NOT NULL, 
		    "password" VARCHAR(64) NOT NULL,
		    "role" VARCHAR(20) DEFAULT 'CUSTOMER',
		    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW());
            CREATE UNIQUE INDEX uq__client__phone ON client (phone);
            CREATE UNIQUE INDEX uq__client__email ON client (email);
        `);

		// Restaurant
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "restaurant" (
		    "id" SERIAL NOT NULL PRIMARY KEY,
			"name" VARCHAR(50) DEFAULT NULL,
		    "address" VARCHAR(100) DEFAULT NULL,
		    "phone" VARCHAR(20) DEFAULT NULL
        )`);

		// Menu
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "menu" (
            "id" SERIAL NOT NULL PRIMARY KEY,
			"name" VARCHAR(50) DEFAULT NULL,
			"restaurant_id" INTEGER REFERENCES restaurant(id));
            CREATE INDEX ix__menu__restaurant_id ON menu (restaurant_id);
        `);

		// Product
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "product" (
		    "id" SERIAL NOT NULL PRIMARY KEY,
		    "name" VARCHAR(50) DEFAULT NULL,
			"category" VARCHAR(50) DEFAULT NULL,
			"count" INT DEFAULT 1,
			"price" INT DEFAULT 0,
			"menu_id" INTEGER REFERENCES menu(id));
            CREATE INDEX ix__product__menu_id ON product (menu_id);
        `);

		// Cart
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "cart" (
	        "id" SERIAL NOT NULL PRIMARY KEY,
			"client_id" INTEGER REFERENCES client(id),
			"amount" INT DEFAULT 0,
			"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW());
            CREATE INDEX ix__cart__client_id ON cart (client_id);
		`);

		// Cart_product
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "cart_product" (
		    "id" SERIAL NOT NULL PRIMARY KEY,
			"cart_id" INTEGER REFERENCES cart(id),
			"product_id" INTEGER REFERENCES product(id),
			"quantity" INT DEFAULT 1);
            CREATE UNIQUE INDEX uq__cart_product___cart_id_product_id ON cart_product (cart_id, product_id);
        `);

		// Order
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "order" (
		    "id" SERIAL NOT NULL PRIMARY KEY,
			"status" VARCHAR(50) DEFAULT NULL,
			"client_id" INTEGER REFERENCES client(id),
			"cart_id" INTEGER REFERENCES cart(id),
			"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW() );
            CREATE UNIQUE INDEX uq__order__cart_id ON "order" (cart_id);
            CREATE INDEX ix__order__client_id ON "order" (client_id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		// Drop all tables
		await queryRunner.query(`DROP TABLE  "order"`);
		await queryRunner.query(`DROP TABLE  "cart"`);
		await queryRunner.query(`DROP TABLE  "cart_product"`);
		await queryRunner.query(`DROP TABLE  "menu"`);
		await queryRunner.query(`DROP TABLE  "product"`);
		await queryRunner.query(`DROP TABLE  "restaurant"`);
		await queryRunner.query(`DROP TABLE  "client"`);
	}
}

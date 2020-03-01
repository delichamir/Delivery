import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dump1583060394070 implements MigrationInterface {
	name = 'Dump1583060394070';

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "cart" (
                "cart_id" SERIAL NOT NULL, 
                "amount" integer NOT NULL, 
                "client_id" integer NOT NULL, 
                "product_id" integer NOT NULL, 
                CONSTRAINT "PK_c741cd2adcfb2f2d1c2743d76b6" PRIMARY KEY ("cart_id"))`,
			undefined
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "client" (
                "client_id" SERIAL NOT NULL, 
                "full_name" character varying NOT NULL, 
                "password" character varying NOT NULL, 
                "role" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_c3049fb351211165bb5ecf34266" UNIQUE ("full_name"), 
                CONSTRAINT "PK_7510ce0a84bde51dbff978b4b49" PRIMARY KEY ("client_id"))`,
			undefined
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "menu" (
                "menu_id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                CONSTRAINT "PK_237a0fe43278378e9c5729d17af" PRIMARY KEY ("menu_id"))`,
			undefined
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "order_detail" (
                "order_detail_id" SERIAL NOT NULL, 
                "cart_id" integer NOT NULL, 
                CONSTRAINT "PK_0a87692ed520d28d56e2ab425b7" PRIMARY KEY ("order_detail_id"))`,
			undefined
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "order" (
                "order_id" SERIAL NOT NULL, 
                "status" character varying NOT NULL, 
                "client_id" integer NOT NULL, 
                "order_detail_id" integer NOT NULL, 
                CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`,
			undefined
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "product" (
                "product_id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "category" character varying NOT NULL, 
                "count" integer NOT NULL, "price" integer NOT NULL, 
                "menu_id" integer NOT NULL, 
                CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`,
			undefined
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "restaurant" (
                "restaurant_id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "address" character varying NOT NULL, 
                "phone" character varying NOT NULL, 
                "menu_id" integer NOT NULL, 
                CONSTRAINT "PK_2ff37383b35fc0eb287bc534191" PRIMARY KEY ("restaurant_id"))`,
			undefined
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`DROP TABLE "restaurant"`, undefined);
		await queryRunner.query(`DROP TABLE "product"`, undefined);
		await queryRunner.query(`DROP TABLE "order"`, undefined);
		await queryRunner.query(`DROP TABLE "order_detail"`, undefined);
		await queryRunner.query(`DROP TABLE "menu"`, undefined);
		await queryRunner.query(`DROP TABLE "client"`, undefined);
		await queryRunner.query(`DROP TABLE "cart"`, undefined);
	}
}

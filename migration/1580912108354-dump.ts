import { MigrationInterface, QueryRunner } from 'typeorm';

export class dump1580912108354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // Drop exists tables
    await queryRunner.query(`DROP TABLE IF EXISTS "clinets"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "basket"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "menu"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "restaurants"`);
    // Create new tables with info
    // Create table clients
    await queryRunner.query(`CREATE TABLE "clients" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "login" varchar(20) DEFAULT NULL,
      "password" text,
      "name" text),
      "email" varchar(255) DEFAULT NULL,
      "register_date" timestamp NULL DEFAULT NULL,
      "token" text ,
      PRIMARY KEY ("id") `);
    // Create table basket
    await queryRunner.query(`CREATE TABLE "basket" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "status" text,
      "update_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "create_date" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id") `);
    // Create table orders
    await queryRunner.query(`CREATE TABLE "orders" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "status" text,
      "update_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "order_date" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id") `); 
    // Create table menu 
    await queryRunner.query(`CREATE TABLE "menu" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "restaurant_id" int(11) DEFAULT NULL,
      "dish_name" text,
      "category" text,
      "price" decimal(10,2) DEFAULT '0.00',
      "count" int(20) DEFAULT NULL,
      PRIMARY KEY ("id") `);
    // Create table restaurants
    await queryRunner.query(`CREATE TABLE "restaurants" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "name" text,
      "address" text,
      PRIMARY KEY ("id") `);  

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // Drop all tables 
    await queryRunner.query(`DROP TABLE "basket"`);
    await queryRunner.query(`DROP TABLE "clinets"`);
    await queryRunner.query(`DROP TABLE "menu"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "restaurants"`);
  }
}




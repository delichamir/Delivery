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
      "token" text `);
    // Create table basket
    await queryRunner.query(`CREATE TABLE "basket" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "status" text,
      "update_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "create_date" timestamp NULL DEFAULT NULL, `);
    // Create table orders
    await queryRunner.query(`CREATE TABLE "orders" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "status" text,
      "update_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "order_date" timestamp NULL DEFAULT NULL, `); 
    // Create table menu 
    await queryRunner.query(`CREATE TABLE "menu" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "restaurant_id" int(11) DEFAULT NULL,
      "dish_name" text,
      "category" text,
      "price" decimal(10,2) DEFAULT '0.00',
      "count" int(20) DEFAULT NULL `);
    // Create table restaurants
    await queryRunner.query(`CREATE TABLE "restaurants" (
      "id" int(11) NOT NULL AUTO_INCREMENT,
      "object_id" int(11) DEFAULT NULL,
      "name" text,
      "address" text `);   

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



CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `object_id` int(11) DEFAULT NULL,
  `login` varchar(20) DEFAULT NULL,
  `password` text,
  `email` varchar(255) DEFAULT NULL,
  `first_name` text,
  `father_name` text,
  `last_name` text,
  `balance` decimal(10,2) DEFAULT '0.00',
  `money_reach` decimal(10,2) DEFAULT '0.00',
  `money_spent` decimal(10,2) DEFAULT '0.00',
  `tmp_money_spent` decimal(10,2) DEFAULT '0.00',
  `tmp_insurance` decimal(10,2) DEFAULT NULL,
  `money_update_time` timestamp NULL DEFAULT NULL,
  `time_spent` bigint(20) DEFAULT '0',
  `gooddeeds` decimal(10,2) DEFAULT NULL,
  `car_id` bigint(20) DEFAULT NULL,
  `car_rent_start_time` timestamp NULL DEFAULT NULL,
  `agree` tinyint(1) DEFAULT NULL,
  `book_count` tinyint(4) DEFAULT '0',
  `tariff_type` tinyint(2) DEFAULT NULL,
  `last_visit_time` timestamp NULL DEFAULT NULL,
  `want_to_close_rent` tinyint(1) DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
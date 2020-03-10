"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class start1583060394070 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create new tables
            // Client
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "client" (
      "id" SERIAL NOT NULL PRIMARY KEY,
			"full_name" VARCHAR(20),
			"phone" VARCHAR(20) DEFAULT NULL, 
			"email" VARCHAR(20),
      "password" VARCHAR(100),
      "role" VARCHAR(20) NULL DEFAULT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      )`);
            // Restaurant
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "restaurant" (
      "restaurant_id" SERIAL,
      "name" VARCHAR(20) DEFAULT NULL,
      "address" VARCHAR(40) DEFAULT NULL,
      "phone" VARCHAR(20) DEFAULT NULL,
      "menu_id" INT DEFAULT NULL,
      PRIMARY KEY ("restaurant_id"),
      FOREIGN KEY ("menu_id") REFERENCES menu("menu_id") 
      )`);
            // Product
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "product" (
      "product_id" SERIAL,
      "name" VARCHAR(20) DEFAULT NULL,
      "category" VARCHAR(20) DEFAULT NULL,
      PRIMARY KEY ("product_id") 
      )`);
            // Restaurant_product
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "restaurant_product" (
      "restaurant_product_id" SERIAL,
      "count" NUMERIC DEFAULT NULL,
      "price" FLOAT DEFAULT NULL,
      "product_id" INT NOT NULL,
      PRIMARY KEY ("restaurant_product_id"),
      FOREIGN KEY ("product_id") REFERENCES product("product_id") 
      )`);
            // Cart_detail
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "cart_detail" (
      "cart_detail_id" SERIAL,
      "client_id" INT DEFAULT NULL,
      "restaurant_product_id" INT DEFAULT NULL,
      PRIMARY KEY ("cart_detail_id"),
      FOREIGN KEY ("client_id") REFERENCES client("client_id"),
      FOREIGN KEY ("restaurant_product_id") REFERENCES restaurant_product("restaurant_product_id") )`);
            // Cart
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "cart" (
      "cart_id" SERIAL,
      "client_id" INT DEFAULT NULL,
      "cart_detail_id" INT DEFAULT NULL,
      PRIMARY KEY ("cart_id"),
      FOREIGN KEY ("cart_detail_id") REFERENCES cart_detail("cart_detail_id") 
      )`);
            // Menu
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "menu" (
      "menu_id" SERIAL,
      "restaurant_product_id" INT DEFAULT NULL,
      PRIMARY KEY ("menu_id"),
      FOREIGN KEY ("restaurant_product_id") REFERENCES restaurant_product("restaurant_product_id") 
      )`);
            // Create table order_detail
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "order_detail" (
      "order_detail_id" SERIAL,
      "amount" FLOAT DEFAULT NULL,
      "restaurant_id" INT DEFAULT NULL,
      "cart_id" INT DEFAULT NULL,
      PRIMARY KEY ("order_detail_id"),
      FOREIGN KEY ("restaurant_id") REFERENCES restaurant("restaurant_id"),
      FOREIGN KEY ("cart_id") REFERENCES cart("cart_id") 
      )`);
            // Create table order
            yield queryRunner.query(`CREATE TABLE IF NOT EXISTS "order" (
      "order_id" SERIAL,
      "status" INT DEFAULT NULL,
      "order_detail_id" INT DEFAULT NULL,
      PRIMARY KEY ("order_id"),
      FOREIGN KEY ("order_detail_id") REFERENCES order_detail("order_detail_id") 
      )`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop all tables
            yield queryRunner.query(`DROP TABLE  "clinet"`);
            yield queryRunner.query(`DROP TABLE  "restaurant"`);
            yield queryRunner.query(`DROP TABLE  "product"`);
            yield queryRunner.query(`DROP TABLE  "restaurant_product"`);
            yield queryRunner.query(`DROP TABLE  "cart_detail"`);
            yield queryRunner.query(`DROP TABLE  "cart"`);
            yield queryRunner.query(`DROP TABLE  "order_detail"`);
            yield queryRunner.query(`DROP TABLE  "menu"`);
            yield queryRunner.query(`DROP TABLE  "order"`);
        });
    }
}
exports.start1583060394070 = start1583060394070;
//# sourceMappingURL=1583060394070-Start.js.map
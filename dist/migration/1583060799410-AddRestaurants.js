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
const typeorm_1 = require("typeorm");
const restaurant_1 = require("../entity/restaurant");
class AddRestaurants1583060799410 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantRepository = typeorm_1.getRepository(restaurant_1.Restaurant);
            // Adding restaurants
            let restaurant = new restaurant_1.Restaurant();
            restaurant.name = 'Додо Пицца';
            restaurant.address = 'г.Москва, 1-я ул. Машиностроения, 10';
            restaurant.phone = '88003330060';
            restaurant.menu_id = 1;
            yield restaurantRepository.save(restaurant);
            let restaurant2 = new restaurant_1.Restaurant();
            restaurant2.name = "Домино'с пицца";
            restaurant2.address = 'г.Москва, Новокузнецкая ул., 6';
            restaurant2.phone = '74959000157';
            restaurant2.menu_id = 2;
            yield restaurantRepository.save(restaurant2);
            let restaurant3 = new restaurant_1.Restaurant();
            restaurant3.name = 'Папа Джонс';
            restaurant3.address = 'г.Москва, Большой Факельный переулок, 3, стр. 2';
            restaurant3.phone = '74957750794';
            restaurant3.menu_id = 3;
            yield restaurantRepository.save(restaurant3);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AddRestaurants1583060799410 = AddRestaurants1583060799410;
//# sourceMappingURL=1583060799410-AddRestaurants.js.map
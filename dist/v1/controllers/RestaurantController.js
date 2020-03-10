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
const class_validator_1 = require("class-validator");
const restaurant_1 = require("../../entity/restaurant");
class RestaurantController {
}
// listAll
RestaurantController.listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get restaurants list from database
    const restaurantRepository = typeorm_1.getRepository(restaurant_1.Restaurant);
    const restaurant = yield restaurantRepository.find({
        select: ['restaurant_id', 'name', 'address', 'phone', 'menu_id']
    });
    res.send(restaurant);
});
// getOneById
RestaurantController.getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    // Get the restaurant from database
    const restaurantRepository = typeorm_1.getRepository(restaurant_1.Restaurant);
    try {
        const user = yield restaurantRepository.findOneOrFail(id, {
            select: ['restaurant_id', 'name', 'address', 'phone', 'menu_id']
        });
    }
    catch (error) {
        res.status(404).send('Restaurnts not found');
    }
});
//newRestaurant
RestaurantController.newRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get parameters from the body
    let { name, address, phone, menu_id } = req.body;
    let restaurant = new restaurant_1.Restaurant();
    restaurant.name = name;
    restaurant.address = address;
    restaurant.phone = phone;
    restaurant.menu_id = menu_id;
    // Validade if the parameters are ok
    const errors = yield class_validator_1.validate(restaurant);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Try to save. If fails, the name is already in use
    const restaurantRepository = typeorm_1.getRepository(restaurant_1.Restaurant);
    try {
        yield restaurantRepository.save(restaurant);
    }
    catch (e) {
        res.status(409).send('Restaurant already exist');
        return;
    }
    // If all ok, send 201 response
    res.status(201).send('Restaurant created successful');
});
// editRestaurant
RestaurantController.editRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    // Get values from the body
    const { name, address, phone, menu_id } = req.body;
    // Try to find user on database
    const restaurantRepository = typeorm_1.getRepository(restaurant_1.Restaurant);
    let restaurant;
    try {
        restaurant = yield restaurantRepository.findOneOrFail(id);
    }
    catch (error) {
        // If not found, send a 404 response
        res.status(404).send('User not found');
        return;
    }
    // Validate the new values on model
    restaurant.name = name;
    restaurant.address = address;
    restaurant.phone = phone;
    restaurant.menu_id = menu_id;
    const errors = yield class_validator_1.validate(restaurant);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Try to safe, if fails, that means restaurant already in use
    try {
        yield restaurantRepository.save(restaurant);
    }
    catch (e) {
        res.status(409).send('Restaurant already in use');
        return;
    }
    // After all send a 204 (no content)
    res.status(204).send();
});
// deleteRestaurant
RestaurantController.deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    const restaurantRepository = typeorm_1.getRepository(restaurant_1.Restaurant);
    let restaurant;
    try {
        restaurant = yield restaurantRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('Restaurant not found');
        return;
    }
    restaurantRepository.delete(id);
    // After all send a 204 (no content)
    res.status(204).send();
});
exports.default = RestaurantController;
//# sourceMappingURL=RestaurantController.js.map
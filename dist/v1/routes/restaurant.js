"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RestaurantController_1 = require("../controllers/RestaurantController");
const checkJwt_1 = require("../../middlewares/checkJwt");
const checkRole_1 = require("../../middlewares/checkRole");
const router = express_1.Router();
// Get all restaurants
router.get('/', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN', 'CUSTOMER'])], RestaurantController_1.default.listAll);
// Get restaurant by id
router.get('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], RestaurantController_1.default.getOneById);
// Create a new restaurant
router.post('/add', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], RestaurantController_1.default.newRestaurant);
// Edit restaurant by id
router.patch('/edit/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], RestaurantController_1.default.editRestaurant);
// Delete restaurant by id
router.delete('/remove/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], RestaurantController_1.default.deleteRestaurant);
exports.default = router;
//# sourceMappingURL=restaurant.js.map
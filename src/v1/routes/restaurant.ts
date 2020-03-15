import { Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';
import MenuController from '../controllers/MenuController';

const restaurant_router = Router();

// Get all restaurants
restaurant_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.listAll
);

// Get restaurant by id
restaurant_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.getOneById
);

// Get list menu of restaurant
restaurant_router.get(
	'/:id([0-9]+)/menu',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.restaurantMenuList
);

// Get one menu of restaurant
restaurant_router.get(
	'/:id([0-9]+)/menu/:menu_id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.restaurantMenuOne
);

// Create a new restaurant
restaurant_router.post(
	'/add',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.newRestaurant
);

// Edit restaurant by id
restaurant_router.patch(
	'/edit/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.editRestaurant
);

// Delete restaurant by id
restaurant_router.delete(
	'/remove/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.deleteRestaurant
);

export default restaurant_router;

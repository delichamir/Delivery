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
	RestaurantController.ListAllRestaurants
);

// Get restaurant by id
restaurant_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.GetOneRestaurantById
);

// Get list menu of restaurant
restaurant_router.get(
	'/:id([0-9]+)/menu',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.RestaurantMenuList
);

// Get one menu of restaurant
restaurant_router.get(
	'/:id([0-9]+)/menu/:menu_id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.RestaurantMenuOne
);

export default restaurant_router;

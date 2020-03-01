import { Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const router = Router();

// Get all restaurants
router.get(
	'/',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	RestaurantController.listAll
);

// Get restaurant by id
router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.getOneById
);

// Create a new restaurant
router.post(
	'/add',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.newRestaurant
);

// Edit restaurant by id
router.patch(
	'/edit/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.editRestaurant
);

// Delete restaurant by id
router.delete(
	'/remove/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	RestaurantController.deleteRestaurant
);

export default router;

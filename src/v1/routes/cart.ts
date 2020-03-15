import { Router } from 'express';
import CartController from '../controllers/CartController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const cart_router = Router();

// Get all carts
cart_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN'])],
	CartController.ListAllCarts
);

// Get cart by ID
cart_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	CartController.GetOneCartById
);

// Add cart by ID
cart_router.post(
	'/add',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	CartController.AddCart
);

export default cart_router;

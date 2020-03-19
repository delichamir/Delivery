import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const order_router = Router();

// Get all orders
order_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN'])],
	OrderController.ListAllOrders
);

// Get order by ID
order_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	OrderController.GetOneOrderById
);

// Add order by ID
order_router.post(
	'/add',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	OrderController.AddOrder
);

// Count of client's orders in each restaurant
order_router.get(
	'/history/restaurants',
	[checkJwt, checkRole(['ADMIN'])],
	OrderController.OrderHistoryRestaurants
);

export default order_router;

import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const product_router = Router();

// Get all products
product_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.ListALLProducts
);

// Get product by id
product_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	ProductController.GetOneProductById
);

export default product_router;

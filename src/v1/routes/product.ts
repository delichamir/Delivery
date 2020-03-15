import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const product_router = Router();

// Get all products
product_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.listAll
);

// Get product by id
product_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	ProductController.getOneById
);

// Create a new product
product_router.post(
	'/add',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.newProduct
);

// Edit product by id
product_router.patch(
	'/edit/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.editProduct
);

// Delete product by id
product_router.delete(
	'/remove/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.deleteProduct
);

export default product_router;

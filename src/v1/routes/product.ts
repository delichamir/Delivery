import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const router = Router();

// Get all products
router.get('/', [checkJwt, checkRole(['ADMIN'])], ProductController.listAll);

// Get product by id
router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.getOneById
);

// Create a new product
router.post(
	'/add',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.newProduct
);

// Edit product by id
router.patch(
	'/edit/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.editProduct
);

// Delete product by id
router.delete(
	'/remove/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	ProductController.deleteProduct
);

export default router;

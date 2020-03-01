import { Router } from 'express';
import MenuController from '../controllers/MenuController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const router = Router();

// Get all menu
router.get('/', [checkJwt, checkRole(['ADMIN'])], MenuController.listAll);

// Get menu by id
router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	MenuController.getOneById
);

// Create a new menu
router.post('/add', [checkJwt, checkRole(['ADMIN'])], MenuController.newMenu);

// Edit menu by id
router.patch(
	'/edit/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	MenuController.editMenu
);

// Delete menu by id
router.delete(
	'/remove/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	MenuController.deleteMenu
);

export default router;

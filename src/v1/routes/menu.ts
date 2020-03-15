import { Router } from 'express';
import MenuController from '../controllers/MenuController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const menu_router = Router();

// Get all menu
menu_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN'])],
	MenuController.ListAllMenu
);

// Get menu by id
menu_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	MenuController.GetOneMenuById
);

export default menu_router;

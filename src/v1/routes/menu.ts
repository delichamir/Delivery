import { Router } from 'express';
import MenuController from '../controllers/MenuController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const menu_router = Router();

// Get all menu
menu_router.get('/', [checkJwt, checkRole(['ADMIN'])], MenuController.listAll);

// Get menu by id
menu_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN', 'CUSTOMER'])],
	MenuController.getOneById
);

export default menu_router;

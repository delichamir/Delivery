import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const user_router = Router();

// Get all users
user_router.get(
	'/',
	[checkJwt, checkRole(['ADMIN'])],
	UserController.ListAllClients
);

// Get user by id
user_router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	UserController.GetOneClientById
);

export default user_router;

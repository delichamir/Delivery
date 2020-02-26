import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../../middlewares/checkJwt';
import { checkRole } from '../../middlewares/checkRole';

const router = Router();

// Get all users
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);

// Get user by id
router.get(
	'/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	UserController.getOneById
);

// Create a new user
router.post('/add', [checkJwt, checkRole(['ADMIN'])], UserController.newUser);

// Edit user by id
router.patch(
	'/edit/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	UserController.editUser
);

// Delete user by id
router.delete(
	'/remove/:id([0-9]+)',
	[checkJwt, checkRole(['ADMIN'])],
	UserController.deleteUser
);

export default router;

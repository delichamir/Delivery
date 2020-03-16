import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../../middlewares/checkJwt';

const auth_router = Router();

// Adding login route
auth_router.post('/login', AuthController.login);

// Adding "change password" route
auth_router.post('/change-password', [checkJwt], AuthController.changePassword);

export default auth_router;

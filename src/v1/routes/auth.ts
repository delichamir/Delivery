import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../../middlewares/checkJwt';

const router = Router();

// Adding login route
router.post('/login', AuthController.login);

// Adding "change password" route
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;

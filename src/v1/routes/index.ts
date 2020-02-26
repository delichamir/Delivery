import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import restaurant from './restaurant';

const routes = Router();

routes.get('/', function(req, res) {
	res.json({
		text: 'Welcome to delivery api !'
	});
});
routes.use('/auth', auth);
routes.use('/client', user);
routes.use('/restaurant', restaurant);

export default routes;

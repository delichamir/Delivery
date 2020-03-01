import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import restaurant from './restaurant';
import product from './product';

const routes = Router();

routes.get('/', function(req, res) {
	res.json({
		text: 'Welcome to delivery api !'
	});
});
routes.use('/auth', auth);
routes.use('/client', user);
routes.use('/restaurant', restaurant);
routes.use('/product', product);

// routes.use('/order', order);
// routes.use('/menu', menu);
// routes.use('/cart', cart);

export default routes;

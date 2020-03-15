import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import restaurant from './restaurant';
import product from './product';
import menu from './menu';
import cartproduct from './cartproduct';
import cart from './cart';
import order from './order';

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
routes.use('/menu', menu);
routes.use('/cartproduct', cartproduct);
routes.use('/cart', cart);
routes.use('/order', order);

export default routes;

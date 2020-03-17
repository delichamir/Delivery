import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Cart } from '../../entity/cart';

class CartController {
	// List of all carts
	static ListAllCarts = async (req: Request, res: Response) => {
		// Get cart list from database
		const cartRepository = getRepository(Cart);
		const cart = await cartRepository.find({
			select: ['id', 'client_id', 'amount', 'createdAt', 'updatedAt']
		});
		res.send(cart);
	};

	// Get one cart
	static GetOneCartById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;
		// Get the cart from database
		const cartRepository = getRepository(Cart);
		try {
			const cart = await getRepository(Cart).query(`
			SELECT  cart.client_id, cart.amount, cart."createdAt", cart."updatedAt", cart_product.product_id, cart_product.quantity FROM cart_product
			LEFT JOIN cart ON cart.id = cart_product.cart_id;
		`);

			res.send(cart);
			return;
		} catch (error) {
			res.status(404).json({
				message: 'Cart not found.',
				status: 'false'
			});
		}
	};

	// Add cart
	static AddCart = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { client_id, amount } = req.body;
		if (!client_id) {
			res.status(400).json({
				message: 'client_id is required.',
				status: 'false'
			});
		}
		let cart = new Cart();

		cart.client_id = client_id;
		cart.amount = amount;

		// Validade if the parameters are ok
		const errors = await validate(cart);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to save.
		const cartRepository = getRepository(Cart);
		try {
			await cartRepository.save(cart);
		} catch (error) {
			res.status(409).json({
				message: 'Cart already exist.',
				status: 'false'
			});
			return;
		}

		// If all ok, send 201 response
		res.status(201).json({
			message: 'Cart added successful.',
			status: 'true'
		});
	};
}

export default CartController;

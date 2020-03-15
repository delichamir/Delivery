import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Cart_product } from '../../entity/car_product';

class CartProductController {
	// List of all cart products
	static ListAllCartProducts = async (req: Request, res: Response) => {
		// Get cart products list from database
		const cartproductRepository = getRepository(Cart_product);
		const cart_product = await cartproductRepository.find({
			select: ['id', 'cart_id', 'product_id', 'quantity']
		});
		res.send(cart_product);
	};

	// Get one cart product
	static GetOneCartProductById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;
		// Get the cart product from database
		const cartproductRepository = getRepository(Cart_product);
		try {
			const cartproduct = await cartproductRepository.findOneOrFail(id, {
				select: ['id', 'cart_id', 'product_id', 'quantity']
			});
		} catch (error) {
			res.status(404).json({
				message: 'Cart product not found.',
				status: 'false'
			});
		}
	};

	// Add cart product
	static AddCartProduct = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { id, cart_id, product_id, quantity } = req.body;
		let cartproduct = new Cart_product();

		cartproduct.id = id;
		cartproduct.cart_id = cart_id;
		cartproduct.product_id = product_id;
		cartproduct.quantity = quantity;

		// Validade if the parameters are ok
		const errors = await validate(cartproduct);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to save.
		const cartproductRepository = getRepository(Cart_product);
		try {
			await cartproductRepository.save(cartproduct);
		} catch (error) {
			res.status(409).json({
				message: 'Cart product already exist.',
				status: 'false'
			});
			return;
		}

		// If all ok, send 201 response
		res.status(201).json({
			message: 'Cart product added successful.',
			status: 'true'
		});
	};

	// Edit cart product
	static EditCartProduct = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;
		// Get values from the body
		let { cart_id, product_id, quantity } = req.body;

		// Try to find cart product on database
		const cartproductRepository = getRepository(Cart_product);
		let cartproduct: Cart_product;
		try {
			cartproduct = await cartproductRepository.findOneOrFail(id);
		} catch (error) {
			// If not found, send a 404 response
			res.status(404).json({
				message: 'Cart product not found.',
				status: 'false'
			});
			return;
		}

		// Validate
		cartproduct.cart_id = cart_id;
		cartproduct.product_id = product_id;
		cartproduct.quantity = quantity;

		const errors = await validate(cartproduct);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to safe
		try {
			await cartproductRepository.save(cartproduct);
		} catch (error) {
			res.status(409).json({
				message: 'Cart product alreadyin use.',
				status: 'false'
			});
			return;
		}
		// After all send a 204 (no content)
		res.status(204).json({
			message: 'No content',
			status: 'false'
		});
	};

	// Delete cart product
	static DeleteCartProduct = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		const cartproductRepository = getRepository(Cart_product);
		let cartproduct: Cart_product;
		try {
			cartproduct = await cartproductRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).json({
				message: 'Cart product not found.',
				status: 'false'
			});
			return;
		}
		cartproductRepository.delete(id);

		// After all send a 204
		res.status(204).json({
			message: 'No content.',
			status: 'false'
		});
	};
}

export default CartProductController;

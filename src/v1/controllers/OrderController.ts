import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Order } from '../../entity/order';

class OrderController {
	// List of all orders
	static ListAllOrders = async (req: Request, res: Response) => {
		// Get order list from database
		const orderRepository = getRepository(Order);
		const order = await orderRepository.find({
			select: [
				'id',
				'status',
				'client_id',
				'cart_id',
				'createdAt',
				'updatedAt'
			]
		});
		res.send(order);
	};

	// Get one order
	static GetOneOrderById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;
		// Get the order from database
		const orderRepository = getRepository(Order);
		try {
			const order = await orderRepository.findOneOrFail(id, {
				select: [
					'status',
					'client_id',
					'cart_id',
					'createdAt',
					'updatedAt'
				]
			});
		} catch (error) {
			res.status(404).json({
				message: 'Order not found.',
				status: 'false'
			});
		}
	};

	// Add order
	static AddOrder = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { cart_id } = req.body;
		if (!cart_id) {
			res.status(400).json({
				message: 'cart_id is required.',
				status: 'false'
			});
		}
		let order = new Order();

		order.cart_id = cart_id;
		order.status = 'Created';

		// Validade if the parameters are ok
		const errors = await validate(order);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to save.
		const orderRepository = getRepository(Order);
		try {
			await orderRepository.save(order);
		} catch (error) {
			res.status(409).json({
				message: 'Order already exist.',
				status: 'false'
			});
			return;
		}

		// If all ok, send 201 response
		res.status(201).json({
			message: 'Order added successful.',
			status: 'true'
		});
	};

	// Count of client's orders in each restaurant
	static OrderHistoryRestaurants = async (req: Request, res: Response) => {
		const datefrom: string = req.body.DateFrom;
		const dateto: string = req.body.DateTo;
		const format = new RegExp(
			'[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[T]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}[Z]{1}'
		);

		// Check validate input params in request
		if (!(format.test(datefrom) && format.test(dateto))) {
			res.status(400).json({
				message:
					'Bad date format, required date format: "2020-01-01T00:00:00Z" ',
				status: 'false'
			});
			return;
		}
		res.send('Good one!');
		// TO DO response list of restaurants with client's orders
	};
}

export default OrderController;

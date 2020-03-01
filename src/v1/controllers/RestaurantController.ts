import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Restaurant } from '../../entity/restaurant';

class RestaurantController {
	// listAll
	static listAll = async (req: Request, res: Response) => {
		// Get restaurants list from database
		const restaurantRepository = getRepository(Restaurant);
		const restaurant = await restaurantRepository.find({
			select: ['restaurant_id', 'name', 'address', 'phone', 'menu_id']
		});

		res.send(restaurant);
	};

	// getOneById
	static getOneById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;

		// Get the restaurant from database
		const restaurantRepository = getRepository(Restaurant);
		try {
			const user = await restaurantRepository.findOneOrFail(id, {
				select: ['restaurant_id', 'name', 'address', 'phone', 'menu_id']
			});
		} catch (error) {
			res.status(404).send('Restaurnts not found');
		}
	};

	//newRestaurant
	static newRestaurant = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { name, address, phone, menu_id } = req.body;
		let restaurant = new Restaurant();

		restaurant.name = name;
		restaurant.address = address;
		restaurant.phone = phone;
		restaurant.menu_id = menu_id;

		// Validade if the parameters are ok
		const errors = await validate(restaurant);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to save. If fails, the name is already in use
		const restaurantRepository = getRepository(Restaurant);
		try {
			await restaurantRepository.save(restaurant);
		} catch (e) {
			res.status(409).send('Restaurant already exist');
			return;
		}

		// If all ok, send 201 response
		res.status(201).send('Restaurant created successful');
	};

	// editRestaurant
	static editRestaurant = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		// Get values from the body
		const { name, address, phone, menu_id } = req.body;

		// Try to find user on database
		const restaurantRepository = getRepository(Restaurant);
		let restaurant;
		try {
			restaurant = await restaurantRepository.findOneOrFail(id);
		} catch (error) {
			// If not found, send a 404 response
			res.status(404).send('User not found');
			return;
		}

		// Validate the new values on model
		restaurant.name = name;
		restaurant.address = address;
		restaurant.phone = phone;
		restaurant.menu_id = menu_id;

		const errors = await validate(restaurant);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to safe, if fails, that means restaurant already in use
		try {
			await restaurantRepository.save(restaurant);
		} catch (e) {
			res.status(409).send('Restaurant already in use');
			return;
		}
		// After all send a 204 (no content)
		res.status(204).send();
	};

	// deleteRestaurant
	static deleteRestaurant = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		const restaurantRepository = getRepository(Restaurant);
		let restaurant: Restaurant;
		try {
			restaurant = await restaurantRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send('Restaurant not found');
			return;
		}
		restaurantRepository.delete(id);

		// After all send a 204 (no content)
		res.status(204).send();
	};
}

export default RestaurantController;

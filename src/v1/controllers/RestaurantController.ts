import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Restaurant } from '../../entity/restaurant';
import { Menu } from '../../entity/menu';

class RestaurantController {
	// listAll
	static listAll = async (req: Request, res: Response) => {
		// Get restaurants list from database
		const restaurantRepository = getRepository(Restaurant);
		const restaurant = await restaurantRepository.find({
			select: ['id', 'name', 'address', 'phone']
		});

		res.send(restaurant);
	};

	// Get one restaurant by ID
	static getOneById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const restaurant_id: string = req.params.id;

		// Get the restaurant from database
		const restaurantRepository = getRepository(Restaurant);
		try {
			const restaurant = await restaurantRepository.findOneOrFail(
				restaurant_id,
				{
					select: ['id', 'name', 'address', 'phone']
				}
			);
			res.send(restaurant);
		} catch (error) {
			res.status(404).json({
				message: 'Restaurant not found.',
				status: 'false'
			});
		}
	};

	static restaurantMenuList = async (req: Request, res: Response) => {
		// Get menu list from database for corrent restaurant
		const restaurant_id: string = req.params.id;
		const menu = await getRepository(Menu)
			.createQueryBuilder('menu')
			.select(['menu.id', 'menu.name'])
			.where('menu.restaurant_id = :id', { id: restaurant_id })
			.getMany();

		res.send(menu);
		return;
	};

	static restaurantMenuOne = async (req: Request, res: Response) => {
		// Get one menu from database for corrent restaurant
		const restaurant_id: string = req.params.id;
		const menu_id: string = req.params.menu_id;

		const menu = await getRepository(Menu)
			.createQueryBuilder('menu')
			.select([
				'menu.id',
				'menu.name'
				// 'product.id',
				// 'product.name',
				// 'product.category',
				// 'product.count',
				// 'product.price'
			])
			.where('menu.restaurant_id = :id AND menu.id = :m_id', {
				id: restaurant_id,
				m_id: menu_id
			})
			.getOne();

		res.send(menu);
		return;
	};

	// Add restaurant
	static newRestaurant = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { name, address, phone } = req.body;
		let restaurant = new Restaurant();

		restaurant.name = name;
		restaurant.address = address;
		restaurant.phone = phone;

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

	// Edit restaurant by id
	static editRestaurant = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		// Get values from the body
		const { name, address, phone } = req.body;

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

	// Delete Restaurant by id
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

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Restaurant } from '../../entity/restaurant';
import { Menu } from '../../entity/menu';

class RestaurantController {
	// listAll
	static ListAllRestaurants = async (req: Request, res: Response) => {
		// Get restaurants list from database
		const restaurantRepository = getRepository(Restaurant);
		const restaurant = await restaurantRepository.find({
			select: ['id', 'name', 'address', 'phone']
		});

		res.send(restaurant);
	};

	// Get one restaurant by ID
	static GetOneRestaurantById = async (req: Request, res: Response) => {
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

	static RestaurantMenuList = async (req: Request, res: Response) => {
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

	static RestaurantMenuOne = async (req: Request, res: Response) => {
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
}

export default RestaurantController;

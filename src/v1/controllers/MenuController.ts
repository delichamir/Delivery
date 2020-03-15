import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Menu } from '../../entity/menu';

class MenuController {
	// List of all menu
	static ListAllMenu = async (req: Request, res: Response) => {
		// Get menu list from database
		const menuRepository = getRepository(Menu);
		const menu = await menuRepository.find({
			select: ['id', 'name', 'restaurant_id']
		});

		res.send(menu);
	};

	// Get one menu by ID
	static GetOneMenuById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const menu_id: string = req.params.id;

		// Get the menu from database
		const menuRepository = getRepository(Menu);

		try {
			const menu = await menuRepository.findOneOrFail(menu_id, {
				select: ['id', 'name', 'restaurant_id']
			});
			res.send(menu);
		} catch (error) {
			res.status(404).json({
				message: 'Menu not found.',
				status: 'false'
			});
		}
	};
}

export default MenuController;

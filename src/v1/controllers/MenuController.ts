import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Menu } from '../../entity/menu';

class MenuController {
	// List of all menu
	static listAll = async (req: Request, res: Response) => {
		// Get menu list from database
		const menuRepository = getRepository(Menu);
		const menu = await menuRepository.find({
			select: ['id', 'name', 'restaurant_id']
		});

		res.send(menu);
	};

	// Get one menu by ID
	static getOneById = async (req: Request, res: Response) => {
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

	// Add new menu
	static newMenu = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { name } = req.body;
		let menu = new Menu();

		menu.name = name;

		// Validade if the parameters are ok
		const errors = await validate(menu);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to save. If fails, the name is already in use
		const menuRepository = getRepository(Menu);
		try {
			await menuRepository.save(menu);
		} catch (e) {
			res.status(409).json({
				message: 'Menu already exist.',
				status: 'false'
			});
			return;
		}

		// If all ok, send 201 response
		res.status(201).json({
			message: 'Menu created successful.',
			status: 'true'
		});
	};

	// Edit menu by ID
	static editMenu = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		// Get values from the body
		const { name, menu_id } = req.body;

		// Try to find menu on database
		const menuRepository = getRepository(Menu);
		let menu: Menu;
		try {
			menu = await menuRepository.findOneOrFail(id);
		} catch (error) {
			// If not found, send a 404 response
			res.status(404).json({
				message: 'Menu not found.',
				status: 'false'
			});
			return;
		}

		// Validate the new values on model
		menu.name = name;

		const errors = await validate(menu);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to safe, if fails, that means menu already in use
		try {
			await menuRepository.save(name);
		} catch (e) {
			res.status(409).json({
				message: 'Menu alreadyin use.',
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

	// Delete menu by ID
	static deleteMenu = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		const menuRepository = getRepository(Menu);
		let menu: Menu;
		try {
			menu = await menuRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).json({
				message: 'Menu not found.',
				status: 'false'
			});
			return;
		}
		menuRepository.delete(id);

		// After all send a 204 (no content)
		res.status(204).json({
			message: 'No content.',
			status: 'false'
		});
	};
}

export default MenuController;

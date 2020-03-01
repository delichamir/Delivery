import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Menu } from '../../entity/menu';

class MenuController {
	// listAll
	static listAll = async (req: Request, res: Response) => {
		// Get menu list from database
		const menuRepository = getRepository(Menu);
		const product = await menuRepository.find({
			select: ['menu_id', 'name']
		});

		res.send(product);
	};

	// getOneById
	static getOneById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;

		// Get the menu from database
		const menuRepository = getRepository(Menu);
		try {
			const user = await menuRepository.findOneOrFail(id, {
				select: ['menu_id', 'name']
			});
		} catch (error) {
			res.status(404).send('Product not found');
		}
	};

	//newMenu
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
			res.status(409).send('Menu already exist');
			return;
		}

		// If all ok, send 201 response
		res.status(201).send('Menu created successful');
	};

	// editMenu
	static editMenu = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		// Get values from the body
		const { name, category, count, price, menu_id } = req.body;

		// Try to find user on database
		const menuRepository = getRepository(Menu);
		let menu: Menu;
		try {
			menu = await menuRepository.findOneOrFail(id);
		} catch (error) {
			// If not found, send a 404 response
			res.status(404).send('Menu not found');
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
			res.status(409).send('Menu already in use');
			return;
		}
		// After all send a 204 (no content)
		res.status(204).send();
	};

	// deleteMenu
	static deleteMenu = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		const menuRepository = getRepository(Menu);
		let menu: Menu;
		try {
			menu = await menuRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send('Menu not found');
			return;
		}
		menuRepository.delete(id);

		// After all send a 204 (no content)
		res.status(204).send();
	};
}

export default MenuController;

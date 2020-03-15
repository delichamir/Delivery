import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Client } from '../../entity/client';

class UserController {
	static ListAllClients = async (req: Request, res: Response) => {
		// Get clients from database
		const userRepository = getRepository(Client);
		const users = await userRepository.find({
			select: [
				'id',
				'full_name',
				'phone',
				'role',
				'email',
				'createdAt',
				'updatedAt'
			]
		});
		// Send the users object
		res.send(users);
	};

	static GetOneClientById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;

		// Get the user from database
		const userRepository = getRepository(Client);
		try {
			const user = await userRepository.findOneOrFail(id, {
				select: ['id', 'full_name', 'phone', 'role', 'email']
			});
		} catch (error) {
			res.status(404).send('User not found');
		}
	};
}

export default UserController;

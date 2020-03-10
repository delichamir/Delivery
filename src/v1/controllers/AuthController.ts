import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Client } from '../../entity/client';
import config from '../../config/config';
import { Validation } from '../../middlewares/checkValidation';

class AuthController {
	// Authorization
	static login = async (req: Request, res: Response) => {
		// Check if email and password are set
		let { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).json({
				message: 'email and password is required.',
				status: 'false'
			});
		}

		// Get user from database
		const userRepository = getRepository(Client);
		let user: Client;
		try {
			user = await userRepository.findOneOrFail({ where: { email } });
		} catch (error) {
			res.status(409).json({
				message: 'This email is not find. Try another.',
				status: 'false'
			});
		}

		// Check if email and encrypted password match
		let match = await Validation(email, password).catch(err => {
			console.error('\n No such email find in base: ', err);
		});

		if (!match) {
			res.status(401).json({
				message: 'email or password is incorrect. Try again',
				status: 'false'
			});
			return;
		}

		// Sing JWT, valid for 1 hour
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			config.jwtSecret,
			{ expiresIn: '1h' }
		);

		// Send the jwt in the response
		res.json({
			token: token,
			status: 'success'
		});
	};

	// Change password for user
	static changePassword = async (req: Request, res: Response) => {
		// Get ID from JWT
		const id = res.locals.jwtPayload.userId;

		// Get parameters from the body
		const { email, oldPassword, newPassword } = req.body;
		if (!(oldPassword && newPassword)) {
			res.status(400).send();
		}

		// Get user from the database
		const userRepository = getRepository(Client);
		let user: Client;
		try {
			user = await userRepository.findOneOrFail(id);
		} catch (id) {
			res.status(401).send();
		}

		// Check if old password matchs
		if (!Validation(email, oldPassword)) {
			res.status(401).send();
			return;
		}

		// Validate de model (password lenght)
		user.password = newPassword;
		const errors = await validate(user);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}
		// Hash the new password and save
		user.hashPassword();
		userRepository.save(user);

		res.status(204).send();
	};
}
export default AuthController;

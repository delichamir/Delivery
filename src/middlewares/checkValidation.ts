import { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import { getRepository } from 'typeorm';
import { Client } from '../entity/client';
import * as bcrypt from 'bcryptjs';

export const checkPasswordValidation = (
	login: string,
	unencryptedPassword: string
) => {
	createConnection(/*...*/)
		.then(async connection => {
			const userRepository = connection.getRepository(Client);
			let user: Client;

			const name = await userRepository.findOne({ full_name: login });
			const password = await userRepository.findOne({
				password: unencryptedPassword
			});

			if (
				login === name.full_name &&
				bcrypt.compareSync(unencryptedPassword, password.password)
			) {
				console.log('######### Validation true !');
				return true;
			}
			console.log('######### Validation false !');
			return false;
		})
		.catch(error => console.log(error));
	return true;
};

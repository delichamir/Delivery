import { getManager } from 'typeorm';
import { Client } from '../entity/client';
import * as bcrypt from 'bcryptjs';

export const Validation = async (
	login: string,
	unencryptedPassword: string
) => {
	const clientRepository = getManager().getRepository(Client);
	const user = await clientRepository.findOne({ full_name: login });

	if (
		login === user.full_name &&
		bcrypt.compareSync(unencryptedPassword, user.password)
	) {
		return true;
	}
	return false;
};

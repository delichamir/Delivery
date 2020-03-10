import { getManager } from 'typeorm';
import { Client } from '../entity/client';
import * as bcrypt from 'bcryptjs';

export const Validation = async (
	email: string,
	unencryptedPassword: string
) => {
	const clientRepository = getManager().getRepository(Client);
	const user = await clientRepository.findOne({ email: email });

	if (
		email === user.email &&
		bcrypt.compareSync(unencryptedPassword, user.password)
	) {
		return true;
	}
	return false;
};

import { getManager } from 'typeorm';
import { Client } from '../entity/client';
import * as bcrypt from 'bcryptjs';

export const Validation = async (
	login: string,
	unencryptedPassword: string
) => {
	const clientRepository = getManager().getRepository(Client);
	const user = await clientRepository.findOne({ full_name: login });

	// console.log(
	// 	'\n ############################################################################'
	// );
	// console.log(user.full_name);
	// console.log(user.password);
	// console.log('\n', user);

	// console.log(
	// 	'############################################################################ \n'
	// );

	if (
		login === user.full_name &&
		bcrypt.compareSync(unencryptedPassword, user.password)
	) {
		console.log('######### Validation true !');
		return true;
	}
	console.log('######### Validation false !');
	return false;
};

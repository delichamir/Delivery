import { postGetAllAction } from '../controller/PostGetAllAction';
import { postGetByIdAction } from '../controller/PostGetByIdAction';
import { postSaveAction } from '../controller/PostSaveAction';

// All application routes.

// GET requests
export const AppRoutes = [
	{
		path: '/restaurant',
		method: 'get',
		action: postGetAllAction
	},
	{
		path: '/restaurant/:id',
		method: 'get',
		action: postGetByIdAction
	}
];

import { postGetAllAction } from '../controller/PostGetAllAction';
import { postGetByIdAction } from '../controller/PostGetByIdAction';
import { postSaveAction } from '../controller/PostSaveAction';

// All application routes.

// GET requests
export const AppRoutes = [
  {
    path: '/restaurants',
    method: 'get',
    action: postGetAllAction
  },
  {
    path: '/restaurants/:id',
    method: 'get',
    action: postGetByIdAction
  },

  // POST requests
  {
    path: '/restaurants',
    method: 'post',
    action: postSaveAction
  }
];

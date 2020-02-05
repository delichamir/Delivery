import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Restaurants } from '../objects/restaurants';

// Loads restaurant info  by id.
export async function postGetByIdAction(request: Request, response: Response) {
  // get a restaurants repository to perform operations with it
  const restaurantsRepository = getManager().getRepository(Restaurants);

  // load restaurant info  by a given id
  const restaurant = await restaurantsRepository.findOne(request.params.id);

  // if post was not found return 404 to the client
  if (!restaurant) {
    response.status(404);
    response.end();
    return;
  }

  // return loaded post
  response.send(restaurant);
}

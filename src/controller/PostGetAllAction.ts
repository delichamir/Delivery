import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Restaurant } from '../entity/restaurant';

// Loads list of restaurants from the database.
export async function postGetAllAction(request: Request, response: Response) {
  // get a restaurants repository to perform operations with it
  const restaurantRepository = getManager().getRepository(Restaurant);

  // load restaurant info  by a given id
  const restaurant = await restaurantRepository.find();

  // return loaded restaurants
  response.send(restaurant);
}

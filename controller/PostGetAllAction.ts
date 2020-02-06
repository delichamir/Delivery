import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Restaurants } from '../entity/restaurant';

// Loads list of restaurants from the database.
export async function postGetAllAction(request: Request, response: Response) {
  // get a restaurants repository to perform operations with it
  const restaurantsRepository = getManager().getRepository(Restaurants);

  // load restaurant info  by a given id
  const restaurants = await restaurantsRepository.find();

  // return loaded restaurants
  response.send(restaurants);
}

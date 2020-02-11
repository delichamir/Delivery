import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Restaurant } from '../entity/restaurant';

// Saves a new restaurant info.

export async function postSaveAction(request: Request, response: Response) {
  // get a restaurants repository to perform operations with it
  const restaurantRepository = getManager().getRepository(Restaurant);

  // create a restaurant object from post json object sent over http
  const newRestaurant = restaurantRepository.create(request.body);

  // save received new restaurant info
  await restaurantRepository.save(newRestaurant);

  // return saved new restaurant info  back
  response.send(newRestaurant);
}

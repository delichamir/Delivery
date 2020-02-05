import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Restaurants } from '../objects/restaurants';

// Saves a new restaurant info.

export async function postSaveAction(request: Request, response: Response) {
  // get a restaurants repository to perform operations with it
  const postRepository = getManager().getRepository(Restaurants);

  // create a restaurant object from post json object sent over http
  const newRestaurant = postRepository.create(request.body);

  // save received new restaurant info
  await postRepository.save(newRestaurant);

  // return saved new restaurant info  back
  response.send(newRestaurant);
}

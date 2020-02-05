import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppRoutes } from './app';

// Create connection with database
createConnection()
  .then(async connection => {
    // Run migrations
    connection.runMigrations();

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
      app[route.method](
        route.path,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err));
        }
      );
    });

    // Set a listen port for app
    app.listen(3000);

    console.log('Application "Delivery" is up and running on port 3000');
  })
  .catch(error => console.log('Connection error: ', error));

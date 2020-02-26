import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './v1/routes';

createConnection()
	.then(async connection => {
		// Create a new express application
		const app = express();

		// Call midlewares [ functions that have access to the request object (req), the response object (res) ]
		app.use(cors());
		app.use(helmet());
		app.use(bodyParser.json());

		// Set all routes from AppRoutes
		app.use('/api/v1', routes);

		app.listen(3000, () => {
			console.log(
				'Application "Delivery" is up and running on port 3000'
			);
		});
	})
	.catch(error => console.log('Connection error: ', error));

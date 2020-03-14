import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Product } from '../../entity/product';

class ProductController {
	// listAll
	static listAll = async (req: Request, res: Response) => {
		// Get products list from database
		const productRepository = getRepository(Product);
		const product = await productRepository.find({
			select: ['id', 'name', 'category', 'count', 'price', 'menu_id']
		});

		res.send(product);
	};

	// getOneById
	static getOneById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id: string = req.params.id;

		// Get the product from database
		const productRepository = getRepository(Product);
		try {
			const product = await productRepository.findOneOrFail(id, {
				select: ['id', 'name', 'category', 'count', 'price', 'menu_id']
			});
		} catch (error) {
			res.status(404).send('Product not found');
		}
	};

	//newProduct
	static newProduct = async (req: Request, res: Response) => {
		// Get parameters from the body
		let { name, category, count, price, menu_id } = req.body;
		let product = new Product();

		product.name = name;
		product.category = category;
		product.count = count;
		product.price = price;
		product.menu_id = menu_id;

		// Validade if the parameters are ok
		const errors = await validate(product);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to save. If fails, the name is already in use
		const productRepository = getRepository(Product);
		try {
			await productRepository.save(product);
		} catch (e) {
			res.status(409).send('Product already exist');
			return;
		}

		// If all ok, send 201 response
		res.status(201).send('Product created successful');
	};

	// editProduct
	static editProduct = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		// Get values from the body
		const { name, category, count, price, menu_id } = req.body;

		// Try to find user on database
		const productRepository = getRepository(Product);
		let product: Product;
		try {
			product = await productRepository.findOneOrFail(id);
		} catch (error) {
			// If not found, send a 404 response
			res.status(404).send('Product not found');
			return;
		}

		// Validate the new values on model
		product.name = name;
		product.category = category;
		product.count = count;
		product.price = price;
		product.menu_id = menu_id;

		const errors = await validate(product);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		// Try to safe, if fails, that means product already in use
		try {
			await productRepository.save(product);
		} catch (e) {
			res.status(409).send('Product already in use');
			return;
		}
		// After all send a 204 (no content)
		res.status(204).send();
	};

	// deleteProduct
	static deleteProduct = async (req: Request, res: Response) => {
		// Get the ID from the url
		const id = req.params.id;

		const productRepository = getRepository(Product);
		let product: Product;
		try {
			product = await productRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send('Product not found');
			return;
		}
		productRepository.delete(id);

		// After all send a 204 (no content)
		res.status(204).send();
	};
}

export default ProductController;

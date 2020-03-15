import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Product } from '../../entity/product';

class ProductController {
	// List of all products
	static ListALLProducts = async (req: Request, res: Response) => {
		// Get products list from database
		const productRepository = getRepository(Product);
		const product = await productRepository.find({
			select: ['id', 'name', 'category', 'count', 'price', 'menu_id']
		});

		res.send(product);
	};

	// Get one product by ID
	static GetOneProductById = async (req: Request, res: Response) => {
		// Get the ID from the url
		const product_id: string = req.params.id;

		// Get the product from database
		const productRepository = getRepository(Product);
		try {
			const product = await productRepository.findOneOrFail(product_id, {
				select: ['id', 'name', 'category', 'count', 'price', 'menu_id']
			});
			res.send(product);
		} catch (error) {
			res.status(404).json({
				message: 'Product not found.',
				status: 'false'
			});
		}
	};
}

export default ProductController;

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ProductModel from '../models/product';

const getProducts = asyncHandler(async (req: Request, res: Response) => {
	try {
		const products = await ProductModel.find({});
		res.json(products);
	} catch (error) {
		if (error instanceof Error) console.error(`Error: ${error.message}`); // .red.underline;
		res.status(404).json({
			message:
				error instanceof Error ? console.error(`Error: ${error.message}`) : '',
		});
	}
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
	try {
		const product = await ProductModel.findById(req.params.id);

		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ message: 'product not found' });
		}
	} catch (error) {
		if (error instanceof Error) console.error(`Error: ${error.message}`); // .red.underline;
		res.status(404).json({
			message:
				error instanceof Error ? console.error(`Error: ${error.message}`) : '',
		});
	}
});

export { getProducts, getProductById };

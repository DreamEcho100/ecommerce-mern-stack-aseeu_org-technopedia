import { Request, Response } from 'express';
import ProductModel from '../models/product';
import asyncHandler from 'express-async-handler';
// import expressAsyncHandler from '../utils/core/express-async-handler';

// @desc    Get products
// @route   GET /api/products
// @access  Public
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

// @desc    Get product by id
// @route   GET /api/products/:id
// @access  Public
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

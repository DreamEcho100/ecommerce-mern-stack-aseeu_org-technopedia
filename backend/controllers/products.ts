import { Request, Response } from 'express';
import ProductModel from '../models/product';
import asyncHandler from 'express-async-handler';
import { itemsInObject } from '../utils/Object';
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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
	const product = await ProductModel.findByIdAndDelete(req.params.id);
	if (!product || !product._id) {
		res.status(404);
		throw new Error('Product not found');
	} else res.json({ success: true });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
	const productData = {} as {
		name: string;
		price: number;
		image: string;
		brand: string;
		category: string;
		countInStock: number;
		description: string;
	};

	const errorMessages: string[] = [];

	if (req.body?.name.length !== 0) productData.name = req.body.name;
	else errorMessages.push('Wrong data with name');
	if (req.body?.price > 0) productData.price = req.body.price;
	else errorMessages.push('Wrong data with price');
	if (req.body?.image.length !== 0) productData.image = req.body.image;
	else errorMessages.push('Wrong data with image');
	if (req.body?.brand.length !== 0) productData.brand = req.body.brand;
	else errorMessages.push('Wrong data with brand');
	if (req.body?.category.length !== 0) productData.category = req.body.category;
	else errorMessages.push('Wrong data with category');
	if (req.body?.countInStock >= 0)
		productData.countInStock = req.body.countInStock;
	else errorMessages.push('Wrong data with countInStock');
	if (req.body?.description.length !== 0)
		productData.description = req.body.description;
	else errorMessages.push('Wrong data with description');

	if (errorMessages.length > 0) {
		res.status(400);
		throw new Error(errorMessages.join(',\n'));
	}

	const product = new ProductModel({
		...productData,
		userRef: req.user._id,
		numReviews: 0,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { existingItems, atLeastOneItemExist } = itemsInObject<{
		name?: string;
		price?: number;
		description?: string;
		image?: string;
		brand?: string;
		category?: string;
		countInStock?: number;
	}>(req.body, [
		'name',
		'price',
		'description',
		'image',
		'brand',
		'category',
		'countInStock',
	]);

	/*
	if (!atLeastOneItemExist) {
		res.status(404);
		throw new Error(`Nothing to update!`);
	}

	const updatedProduct = await ProductModel.findByIdAndUpdate(
		req.params.id,
		atLeastOneItemExist,
		{
			new: true,
		}
	);


	if (!updatedProduct) {
		res.status(404);
		throw new Error(`User with ${req.params.id} not found.`);
	} else {
		res.json(updatedProduct);
	}
	*/

	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await ProductModel.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
};

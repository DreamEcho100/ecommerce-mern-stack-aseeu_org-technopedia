import express from 'express';

import { adminMiddleware, protectMiddleware } from '../middleware/auth';
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from '../controllers/products';

const productsRoutes = express.Router();

productsRoutes
	.route('/')
	.get(getProducts)
	.post(protectMiddleware, adminMiddleware, createProduct);
productsRoutes
	.route('/:id')
	.get(getProductById)
	.delete(protectMiddleware, adminMiddleware, deleteProduct)
	.put(protectMiddleware, adminMiddleware, updateProduct);

export default productsRoutes;

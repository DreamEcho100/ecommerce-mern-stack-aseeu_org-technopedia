import express from 'express';
const productsRoutes = express.Router();
import { getProductById, getProducts } from '../controllers/products';

productsRoutes.route('/').get(getProducts);

productsRoutes.route('/:id').get(getProductById);

export default productsRoutes;

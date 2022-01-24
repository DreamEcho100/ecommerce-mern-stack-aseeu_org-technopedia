import express from 'express';
const orderRoutes = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
} from '../controllers/order';
import { protectMiddleware } from '../middleware/auth';

orderRoutes.route('/').post(protectMiddleware, addOrderItems);
orderRoutes.route('/:id').get(protectMiddleware, getOrderById);
orderRoutes.route('/:id/pay').put(protectMiddleware, updateOrderToPaid);

export default orderRoutes;

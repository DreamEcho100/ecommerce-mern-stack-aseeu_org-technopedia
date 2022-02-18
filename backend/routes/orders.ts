import express from 'express';
const orderRoutes = express.Router();
import {
	addOrderItems,
	getMyOrders,
	getOrderById,
	getOrders,
	updateOrderToDelivered,
	updateOrderToPaid,
} from '../controllers/order';
import { adminMiddleware, protectMiddleware } from '../middleware/auth';

orderRoutes
	.route('/')
	.post(protectMiddleware, addOrderItems)
	.get(protectMiddleware, adminMiddleware, getOrders);

orderRoutes.route('/myOrders').get(protectMiddleware, getMyOrders);

orderRoutes.route('/:id').get(protectMiddleware, getOrderById);
// .put(protectMiddleware, adminMiddleware, updateOrderToDelivered);

orderRoutes.route('/:id/pay').put(protectMiddleware, updateOrderToPaid);

orderRoutes
	.route('/:id/delivery')
	.put(protectMiddleware, adminMiddleware, updateOrderToDelivered);

export default orderRoutes;

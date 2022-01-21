import express from 'express';
const orderRoutes = express.Router();
import { addOrderItems, getOrderById } from '../controllers/order';
import { protectMiddleware } from '../middleware/auth';

orderRoutes.route('/').post(protectMiddleware, addOrderItems);
orderRoutes.route('/:id').get(protectMiddleware, getOrderById);

export default orderRoutes;

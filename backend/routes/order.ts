import express from 'express';
const orderRoutes = express.Router();
import { addOrderItems } from '../controllers/order.js';
import { protectMiddleware } from '../middleware/auth.js';

orderRoutes.route('/').post(protectMiddleware, addOrderItems);

export default orderRoutes;

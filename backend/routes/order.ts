import express from 'express';
const orderRoutes = express.Router();
import { addOrderItems } from '../controllers/order';
import { protectMiddleware } from '../middleware/auth';

orderRoutes.route('/').post(protectMiddleware, addOrderItems);

export default orderRoutes;

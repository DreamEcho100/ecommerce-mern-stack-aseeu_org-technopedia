import asyncHandler from 'express-async-handler';
import OrderModel from '../models/order';
import { Request, Response } from 'express';
import { CustomRequest } from '../general';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(
	async (req: CustomRequest, res: Response) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body;

		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error('No order items');
			return;
		} else {
			const order = new OrderModel({
				orderItems,
				user_id: req.user._id,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});

			const createdOrder = await order.save();

			res.status(201).json(createdOrder);
		}
	}
);

export { addOrderItems };

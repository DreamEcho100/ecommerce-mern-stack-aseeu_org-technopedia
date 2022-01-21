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
				userRef: req.user._id,
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

// @desc    Create new order
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
	const order = await OrderModel.findById(req.params.id).populate(
		'userRef',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

export { addOrderItems, getOrderById };

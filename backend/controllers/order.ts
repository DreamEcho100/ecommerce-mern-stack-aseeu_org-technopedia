import { Schema, Document, Model, model } from 'mongoose';

import OrderModel from '../models/order';
import { Request, Response } from 'express';
// import { CustomRequest } from '../general';
import asyncHandler from 'express-async-handler';
// import expressAsyncHandler from '../utils/core/express-async-handler';

/**
 * @desc    Create new order
 * @route   `POST` `/api/orders`
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
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
});

/**
 * @desc    Get order by id
 * @route   `GET` `/api/orders/:id`
 * @access  Private
 */
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
	const order = await OrderModel.findById(req.params.id).populate({
		path: 'userRef',
		select: 'name email',
	});

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

/**
 * @desc    Update order to paid
 * @route   `GET` `/api/orders/:id/pay`
 * @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
	const order = await OrderModel.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.time,
			email_address: req.body.payer.email_address,
		};

		const updateOrder = await order.save();

		res.json(updateOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

/**
 * @desc    Get user orders
 * @route   `GET` `/api/orders/myOrders`
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await OrderModel.find({
		userRef: req.user._id as unknown as typeof Schema.Types.ObjectId,
	}).populate([{ path: 'userRef', select: 'name email' }]);
	res.json(orders);
});

/**
 * @desc    Get orders
 * @route   `GET` `/api/orders`
 * @access  Private/Admin
 */
const getOrders = asyncHandler(async (req: Request, res: Response) => {
	try {
		const orders = await OrderModel.find({}).populate({
			path: 'userRef',
			select: 'name email',
		});
		res.json(orders);
	} catch (error) {
		if (error instanceof Error) console.error(`Error: ${error.message}`); // .red.underline;
		res.status(404).json({
			message:
				error instanceof Error ? console.error(`Error: ${error.message}`) : '',
		});
	}
});

/**
 * @desc    Update order to paid
 * @route   `PUT` `/api/orders/:id/delivery`
 * @access  Private/Admin
 */
const updateOrderToDelivered = asyncHandler(
	async (req: Request, res: Response) => {
		const orderUpdated = await OrderModel.findByIdAndUpdate(
			req.params.id,
			{
				isDelivered: true,
				deliveredAt: Date.now(),
			},
			{
				new: true,
			}
		);

		if (orderUpdated?._id) {
			res.json(orderUpdated);
		} else {
			res.status(404);
			throw new Error('Order not found');
		}
	}
);

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
};

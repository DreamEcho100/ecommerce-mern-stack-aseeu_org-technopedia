import OrderModel from '../models/order';
import { Request, Response } from 'express';
import { CustomRequest } from '../general';
// import asyncHandler from 'express-async-handler';
import expressAsyncHandler from '../utils/core/express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = expressAsyncHandler(
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

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = expressAsyncHandler(async (req: Request, res: Response) => {
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

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = expressAsyncHandler(async (req: Request, res: Response) => {
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

// @desc    get user orders
// @route   GET /api/orders/myOrders
// @access  Private
const getMyOrders = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
	const orders = await OrderModel.find({ user: req.user._id });
	res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };

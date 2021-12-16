import { Schema, model } from 'mongoose';

type PaymentResult = {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
};

type OrderItem = {
	name: String;
	quantity: Number;
	image: String;
	price: Number;
	product: typeof Schema.Types.ObjectId;
};

type ShippingAddress = {
	address: string;
	city: string;
	postalCode: string;
	country: string;
};

interface Order {
	user: typeof Schema.Types.ObjectId;
	orderItems: OrderItem[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	paymentResult: PaymentResult;
	category: string;
	taxPrice: number;
	shippingPrice: number;
	isPaid: boolean;
	paidAt?: Date;
	isDelivered: boolean;
	DeliveredAt?: Date;
}

const orderSchema = new Schema<Order>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		category: {
			type: String,
			required: true,
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		DeliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const OrderModel = model('Order', orderSchema);

export default OrderModel;

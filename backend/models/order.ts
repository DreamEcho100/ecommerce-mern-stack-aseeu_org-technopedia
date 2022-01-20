import { Schema, Document, Model, model } from 'mongoose';

interface IPaymentResult {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

interface IOrderItem {
	name: String;
	quantity: Number;
	image: String;
	price: Number;
	product_id: typeof Schema.Types.ObjectId;
}

interface IShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface IOrder {
	user_id: typeof Schema.Types.ObjectId;
	orderItems: IOrderItem[];
	shippingAddress: IShippingAddress;
	itemsPrice: string;
	paymentMethod: string;
	paymentResult: IPaymentResult;
	// category: string;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: string;
	isPaid: boolean;
	paidAt?: Date;
	isDelivered: boolean;
	DeliveredAt?: Date;
}
interface IOrderDocument extends IOrder, Document {}
interface IOrderModel extends Model<IOrderDocument> {}

const orderSchema: Schema<IOrderDocument> = new Schema(
	{
		user_id: {
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
				product_id: {
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
		itemsPrice: {
			type: String,
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
		// category: {
		// 	type: String,
		// 	required: true,
		// },
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
		totalPrice: {
			type: String,
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

const OrderModel = model<IOrderDocument, IOrderModel>('Order', orderSchema);

export default OrderModel;

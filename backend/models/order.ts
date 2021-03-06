import { Schema, Document, Model, model } from 'mongoose';
import { TDate } from '../general';

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
	productRef: typeof Schema.Types.ObjectId;
}

interface IShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface IOrder {
	userRef: typeof Schema.Types.ObjectId;
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
	paidAt?: TDate;
	isDelivered: boolean;
	deliveredAt?: TDate;
}
interface IOrderDocument extends IOrder, Document {}
interface IOrderModel extends Model<IOrderDocument> {}

const orderSchema: Schema<IOrderDocument> = new Schema(
	{
		userRef: {
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
				productRef: {
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
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const OrderModel = model<IOrderDocument, IOrderModel>('Order', orderSchema);

export default OrderModel;

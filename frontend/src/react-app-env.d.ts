/// <reference types="react-scripts" />

export type TDate = string | number | Date;

export interface IProduct {
	_id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
	numReviews: number;
}

export type TProducts = IProduct[];

export interface IUser {
	_id: string;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	token: string;
}

export interface IAdmin {
	usersList?: IUser[];
	actions: {
		requests: {
			usersList: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
		};
	};
}

export interface ICartItem {
	_id: IProduct['_id'];
	name: IProduct['name'];
	image: IProduct['image'];
	price: IProduct['price'];
	countInStock: IProduct['countInStock'];
	quantity: number;
}

export interface IShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export type TPaymentMethod = 'PayPal' | 'Stripe';

export interface IOrder {
	_id: string;
	items: ICartItem[];
	userRef: {
		_id: IUser['_id'];
		name: IUser['name'];
		email: IUser['email'];
	};
	shippingAddress: IShippingAddress;
	paymentMethod: TPaymentMethod;
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
	isPaid: boolean;
	paidAt?: Date;
	isDelivered: boolean;
	deliveredAt?: Date;
	createdAt: TDate;
}

export interface IOrderPay {
	createdAt: TDate;
	isDelivered: boolean;
	isPaid: boolean;
	itemsPrice: string;
	orderItems: ICartItem[];
	paidAt: TDate;
	paymentMethod: TPaymentMethod;
	paymentResult: {
		id: string;
		status: string;
		update_time: TDate;
		email_address: string;
	};
	shippingAddress: IShippingAddress;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: string;
	updatedAt: TDate;
	userRef: string;
	// __v: 0
	_id: string;
}

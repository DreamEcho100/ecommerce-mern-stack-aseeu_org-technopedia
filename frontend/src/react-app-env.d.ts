/// <reference types="react-scripts" />

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
	user_id: IUser['_id'];
	shippingAddress: IShippingAddress;
	paymentMethod: TPaymentMethod;
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
	isPaid: boolean;
	paidAt?: Date;
	isDelivered: boolean;
	DeliveredAt?: Date;
	/*
 orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
	*/
}

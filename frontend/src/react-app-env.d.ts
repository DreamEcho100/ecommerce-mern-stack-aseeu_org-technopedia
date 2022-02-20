/// <reference types="react-scripts" />

export type TDate = string | number | Date;

export interface IBasicUser {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface IUser extends IBasicUser {
	password: string;
	token: string;
}

export interface INewProductData {
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	// rating: IProduct['rating'];
	// numReviews: IProduct['numReviews'];
}
export interface IProduct extends INewProductData {
	_id: string;
	userRef: IUser['_id'];
	rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
	numReviews: number;
	reviews: any[];
	createdAt: Date;
	updatedAt: Date;
}

export type TProducts = IProduct[];

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
	paidAt?: TDate;
	isDelivered: boolean;
	deliveredAt?: TDate;
	createdAt: TDate;
}

export interface IAdmin {
	usersList: IUser[];
	ordersList: IOrder[];
	selectedUser?: IBasicUser;
	actions: {
		requests: {
			deleteUser: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			usersList: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			getSelectedUser: {
				isLoading: boolean;
				error: string;
			};
			updateSelectedUser: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			deleteProduct: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			createProduct: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			updateProduct: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			getOrdersList: {
				isLoading: boolean;
				error: string;
				// success: boolean;
			};
			orderDelivery: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
		};
	};
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

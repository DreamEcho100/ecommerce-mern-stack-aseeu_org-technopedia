/// <reference types="react-scripts" />

export type TProduct = {
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
};

export type TProducts = TProduct[];

export type TUser = {
	_id: string;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

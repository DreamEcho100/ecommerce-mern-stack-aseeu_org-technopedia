import { TProduct, TProducts } from 'src/react-app-env';
import {
	//
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/constants/productList';
import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/constants/productDetails';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants/cart';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from 'src/constants';
import { Reducer } from 'redux';

/* ************************ */
/****** PRODUCTS LIST ******/
/* ************************ */
export type T_STORE_PRODUCTS_LIST_STATE = {
	products: TProducts | [];
	loading: boolean;
	error: string;
};

export type T_STORE_PRODUCTS_LIST_ACTION =
	| { type: typeof PRODUCTS_LIST_REQUEST }
	| {
			type: typeof PRODUCTS_LIST_SUCCESS;
			payload: { products: T_STORE_PRODUCTS_LIST_STATE['products'] };
	  }
	| {
			type: typeof PRODUCTS_LIST_FAIL;
			payload: { error: T_STORE_PRODUCTS_LIST_STATE['error'] };
	  };

export type T_STORE_PRODUCTS_LIST_DISPATCH =
	| React.Dispatch<T_STORE_PRODUCTS_LIST_ACTION>
	| ((value: T_STORE_PRODUCTS_LIST_ACTION) => void);

export type T_STORE_PRODUCTS_LIST_REDUCER = Reducer<
	T_STORE_PRODUCTS_LIST_STATE,
	T_STORE_PRODUCTS_LIST_ACTION
>;

/* ************************ */
/***** PRODUCTS DETAIL *****/
/* ************************ */
export type T_STORE_PRODUCT_DETAILS_STATE = {
	product: TProduct;
	loading: boolean;
	error: string;
};

export type T_STORE_PRODUCT_DETAILS_ACTION =
	| { type: typeof PRODUCT_DETAILS_REQUEST }
	| {
			type: typeof PRODUCT_DETAILS_SUCCESS;
			payload: { product: T_STORE_PRODUCT_DETAILS_STATE['product'] };
	  }
	| {
			type: typeof PRODUCT_DETAILS_FAIL;
			payload: { error: T_STORE_PRODUCT_DETAILS_STATE['error'] };
	  };

export type T_STORE_PRODUCT_DETAILS_DISPATCH =
	| React.Dispatch<T_STORE_PRODUCT_DETAILS_ACTION>
	| ((value: T_STORE_PRODUCT_DETAILS_ACTION) => void);

export type T_STORE_PRODUCT_DETAILS_REDUCER = Reducer<
	T_STORE_PRODUCT_DETAILS_STATE,
	T_STORE_PRODUCT_DETAILS_ACTION
>;

/* ************************ */
/***** CART *****/
/* ************************ */
export type T_STORE_CART = {
	_id: TProduct['_id'];
	name: TProduct['name'];
	image: TProduct['image'];
	price: TProduct['price'];
	countInStock: TProduct['countInStock'];
	quantity: number;
};

export type T_STORE_CART_STATE = {
	items: T_STORE_CART[] | [];
};

export type T_STORE_CART_ACTION =
	| {
			type: typeof CART_ADD_ITEM;
			payload: { item: T_STORE_CART };
	  }
	| {
			type: typeof CART_REMOVE_ITEM;
			payload: { _id: T_STORE_CART['_id'] };
	  };

export type T_STORE_CART_DISPATCH =
	| React.Dispatch<T_STORE_CART_ACTION>
	| ((value: T_STORE_CART_ACTION) => void);

export type T_STORE_CART_REDUCER = Reducer<
	T_STORE_CART_STATE,
	T_STORE_CART_ACTION
>;

/* ************************ */
/***** USER *****/
/* ************************ */
export type T_USER = {
	_id: string;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

export type T_USER_STATE = {
	info: T_USER | {};
	loading: boolean;
	error: string;
};

export type T_USER_ACTION =
	| {
			type: typeof USER_LOGIN_REQUEST;
	  }
	| {
			type: typeof USER_LOGIN_SUCCESS;
			payload: { info: T_USER };
	  }
	| {
			type: typeof USER_LOGIN_FAIL;
			payload: { error: string };
	  }
	| {
			type: typeof USER_LOGOUT;
	  };

export type T_USER_DISPATCH =
	| React.Dispatch<T_USER_ACTION>
	| ((value: T_USER_ACTION) => void);

export type T_USER_REDUCER = Reducer<T_USER_STATE, T_USER_ACTION>;

/* ************************ */
/******* STORE STATE *******/
/* ************************ */
export type STORE_STATE = {
	user: T_USER_STATE;
	productList: T_STORE_PRODUCTS_LIST_STATE;
	productDetails: T_STORE_PRODUCT_DETAILS_STATE;
	cart: T_STORE_CART_STATE;
};

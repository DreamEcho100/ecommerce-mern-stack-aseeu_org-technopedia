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
import { Reducer } from 'redux';

/* ************************ */
/****** PRODUCTS LIST ******/
/* ************************ */
export type STORE_PRODUCTS_LIST_STATE = {
	products: TProducts | [];
	loading: boolean;
	error: string;
};

export type STORE_PRODUCTS_LIST_ACTION_TYPE =
	| { type: typeof PRODUCTS_LIST_REQUEST }
	| {
			type: typeof PRODUCTS_LIST_SUCCESS;
			payload: { products: STORE_PRODUCTS_LIST_STATE['products'] };
	  }
	| {
			type: typeof PRODUCTS_LIST_FAIL;
			payload: { error: STORE_PRODUCTS_LIST_STATE['error'] };
	  };

export type STORE_PRODUCTS_LIST_DISPATCH_TYPE =
	| React.Dispatch<STORE_PRODUCTS_LIST_ACTION_TYPE>
	| ((value: STORE_PRODUCTS_LIST_ACTION_TYPE) => void);

export type STORE_PRODUCTS_LIST_REDUCER = Reducer<
	STORE_PRODUCTS_LIST_STATE,
	STORE_PRODUCTS_LIST_ACTION_TYPE
>;

/* ************************ */
/***** PRODUCTS DETAIL *****/
/* ************************ */
export type STORE_PRODUCT_DETAILS_STATE = {
	product: TProduct;
	loading: boolean;
	error: string;
};

export type STORE_PRODUCT_DETAILS_ACTION_TYPE =
	| { type: typeof PRODUCT_DETAILS_REQUEST }
	| {
			type: typeof PRODUCT_DETAILS_SUCCESS;
			payload: { product: STORE_PRODUCT_DETAILS_STATE['product'] };
	  }
	| {
			type: typeof PRODUCT_DETAILS_FAIL;
			payload: { error: STORE_PRODUCT_DETAILS_STATE['error'] };
	  };

export type STORE_PRODUCT_DETAILS_DISPATCH_TYPE =
	| React.Dispatch<STORE_PRODUCT_DETAILS_ACTION_TYPE>
	| ((value: STORE_PRODUCT_DETAILS_ACTION_TYPE) => void);

export type STORE_PRODUCT_DETAILS_REDUCER = Reducer<
	STORE_PRODUCT_DETAILS_STATE,
	STORE_PRODUCT_DETAILS_ACTION_TYPE
>;

/* ************************ */
/***** CART *****/
/* ************************ */
export type CART_ITEM_TYPE = {
	_id: TProduct['_id'];
	name: TProduct['name'];
	image: TProduct['image'];
	price: TProduct['price'];
	countInStock: TProduct['countInStock'];
	quantity: number;
};

export type STORE_CART_STATE = {
	items: CART_ITEM_TYPE[] | [];
};

export type STORE_CART_ACTION_TYPE =
	| {
			type: typeof CART_ADD_ITEM;
			payload: { item: CART_ITEM_TYPE };
	  }
	| {
			type: typeof CART_REMOVE_ITEM;
			payload: { _id: CART_ITEM_TYPE['_id'] };
	  };

export type STORE_CART_DISPATCH_TYPE =
	| React.Dispatch<STORE_CART_ACTION_TYPE>
	| ((value: STORE_CART_ACTION_TYPE) => void);

export type STORE_CART_REDUCER = Reducer<
	STORE_CART_STATE,
	STORE_CART_ACTION_TYPE
>;

/* ************************ */
/******* STORE STATE *******/
/* ************************ */
export type STORE_STATE = {
	productList: STORE_PRODUCTS_LIST_STATE;
	productDetails: STORE_PRODUCT_DETAILS_STATE;
	cart: STORE_CART_STATE;
};

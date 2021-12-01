import { Product, Products } from 'src/react-app-env';
import {
	//
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/constants/productListConstants';
import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/constants/productDetailsConstants';

/* */
export type STORE_PRODUCTS_LIST_STATE = {
	products: Products | [];
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

/* */
export type STORE_PRODUCT_DETAILS_STATE = {
	product: Product;
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

/* */
export type STORE_STATE = {
	productList: STORE_PRODUCTS_LIST_STATE;
	productDetails: STORE_PRODUCT_DETAILS_STATE;
};

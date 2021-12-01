import { Products } from 'src/react-app-env';
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
} from 'src/constants/productConstants';

export type STORE_STATE_PRODUCT_LIST = {
	products: Products | [];
	loading: boolean;
	error: string;
};

export type STORE_STATE = {
	productList: STORE_STATE_PRODUCT_LIST;
};

export type STORE_PRODUCTS_ACTION_TYPE =
	| { type: typeof PRODUCT_LIST_REQUEST }
	| {
			type: typeof PRODUCT_LIST_SUCCESS;
			payload: { products: STORE_STATE_PRODUCT_LIST['products'] };
	  }
	| {
			type: typeof PRODUCT_LIST_FAIL;
			payload: { error: STORE_STATE_PRODUCT_LIST['error'] };
	  };

export type STORE_DISPATCH_TYPE =
	| React.Dispatch<STORE_PRODUCTS_ACTION_TYPE>
	| ((value: STORE_PRODUCTS_ACTION_TYPE) => void);

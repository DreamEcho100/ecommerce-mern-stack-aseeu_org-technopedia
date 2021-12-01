import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
} from 'src/constants/productConstants';
import {
	STORE_PRODUCTS_ACTION_TYPE,
	STORE_STATE_PRODUCT_LIST,
} from 'src/store/ts/types';
import { Reducer } from 'redux';

const initialState: STORE_STATE_PRODUCT_LIST = {
	products: [],
	loading: false,
	error: '',
};

export const productListReducer: Reducer<
	STORE_STATE_PRODUCT_LIST,
	STORE_PRODUCTS_ACTION_TYPE
> = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST: {
			return {
				...state,
				products: [],
				loading: true,
				error: '',
			};
		}

		case PRODUCT_LIST_SUCCESS: {
			const { products } = action.payload;

			return {
				...state,
				products: products,
				loading: false,
				error: '',
			};
		}

		case PRODUCT_LIST_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				products: [],
				loading: false,
				error: error,
			};
		}

		default:
			return state;
	}
};

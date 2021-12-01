import {
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/constants/productListConstants';
import {
	STORE_PRODUCTS_LIST_ACTION_TYPE,
	STORE_PRODUCTS_LIST_STATE,
} from 'src/store/ts/types';
import { Reducer } from 'redux';

const initialState: STORE_PRODUCTS_LIST_STATE = {
	products: [],
	loading: false,
	error: '',
};

const productListReducer: Reducer<
	STORE_PRODUCTS_LIST_STATE,
	STORE_PRODUCTS_LIST_ACTION_TYPE
> = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_LIST_REQUEST: {
			return {
				...state,
				products: [],
				loading: true,
				error: '',
			};
		}

		case PRODUCTS_LIST_SUCCESS: {
			const { products } = action.payload;

			return {
				...state,
				products: products,
				loading: false,
				error: '',
			};
		}

		case PRODUCTS_LIST_FAIL: {
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

export default productListReducer;

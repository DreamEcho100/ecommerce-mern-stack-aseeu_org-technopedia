import {
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/constants/productList';
import { STORE_PRODUCTS_LIST_REDUCER } from 'src/store/ts/types';
import { productListInitialState } from 'src/store/initialState';

const productListReducer: STORE_PRODUCTS_LIST_REDUCER = (
	state = productListInitialState,
	action
) => {
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

import {
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/constants';
import { TStoreProductsListReducer } from 'src/store/ts';
import { returnProductListInitialState } from 'src/store/initialState';

const productListReducer: TStoreProductsListReducer = (
	state = returnProductListInitialState(),
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

		default: {
			return state;
		}
	}
};

export default productListReducer;

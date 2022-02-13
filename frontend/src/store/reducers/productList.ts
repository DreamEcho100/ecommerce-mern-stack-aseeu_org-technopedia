import {
	PRODUCTS_LIST_REQUEST_FAIL,
	PRODUCTS_LIST_REQUEST_SUCCESS,
	PRODUCTS_LIST_REQUEST_PENDING,
} from 'src/lib/core/constants';
import { TStoreProductsListReducer } from 'src/store/ts';
import { returnProductListInitialState } from 'src/store/initialState';

const productListReducer: TStoreProductsListReducer = (
	state = returnProductListInitialState(),
	action
) => {
	switch (action.type) {
		case PRODUCTS_LIST_REQUEST_PENDING: {
			return {
				...returnProductListInitialState(),
				isLoading: true,
			};
		}

		case PRODUCTS_LIST_REQUEST_SUCCESS: {
			const { products } = action.payload;

			return {
				...returnProductListInitialState(),
				isLoading: false,
				products: products,
			};
		}

		case PRODUCTS_LIST_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				...returnProductListInitialState(),
				isLoading: false,
				error: error,
			};
		}

		default: {
			return state;
		}
	}
};

export default productListReducer;

import {
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/lib/core/constants';
import { TStoreProductsListReducer } from 'src/store/ts';
import { returnProductListInitialState } from 'src/store/initialState';

const productListReducer: TStoreProductsListReducer = (
	state = returnProductListInitialState(),
	action
) => {
	switch (action.type) {
		case PRODUCTS_LIST_REQUEST: {
			return {
				...returnProductListInitialState(),
				isLoading: true,
			};
		}

		case PRODUCTS_LIST_SUCCESS: {
			const { products } = action.payload;

			return {
				...returnProductListInitialState(),
				products: products,
			};
		}

		case PRODUCTS_LIST_FAIL: {
			const { error } = action.payload;

			return {
				...returnProductListInitialState(),
				error: error,
			};
		}

		default: {
			return state;
		}
	}
};

export default productListReducer;

import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
} from 'src/constants/productConstants';
import { InitialState } from 'src/store';

type Action =
	| { type: typeof PRODUCT_LIST_REQUEST; payload?: {} }
	| {
			type: typeof PRODUCT_LIST_SUCCESS;
			payload: { products: InitialState['products'] };
	  }
	| {
			type: typeof PRODUCT_LIST_FAIL;
			payload: { error: InitialState['error'] };
	  };

export const productListReducer = (state: InitialState, action: Action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST: {
			return { ...state, loading: true, products: [] };
		}

		case PRODUCT_LIST_SUCCESS: {
			const { products } = action.payload;

			return { ...state, loading: false, products: products };
		}

		case PRODUCT_LIST_FAIL: {
			const { error } = action.payload;

			return { ...state, loading: false, error: error };
		}

		default:
			return state;
	}
};

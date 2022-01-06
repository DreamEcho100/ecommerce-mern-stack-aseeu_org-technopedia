import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/constants';
import { T_STORE_PRODUCT_DETAILS_REDUCER } from 'src/store/ts/types';
import { productDetailsInitialState } from 'src/store/initialState';

const productDetailsReducer: T_STORE_PRODUCT_DETAILS_REDUCER = (
	state = productDetailsInitialState,
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST: {
			return { ...state, loading: true, error: '' };
		}

		case PRODUCT_DETAILS_SUCCESS: {
			const { product } = action.payload;

			return { ...state, product, loading: false, error: '' };
		}

		case PRODUCT_DETAILS_FAIL: {
			const { error } = action.payload;
			return {
				...state,
				product: productDetailsInitialState.product,
				loading: false,
				error,
			};
		}

		default:
			return state;
	}
};

export default productDetailsReducer;

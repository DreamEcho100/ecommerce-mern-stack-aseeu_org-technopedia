import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/constants';
import { TStoreProductDetailsReducer } from 'src/store/ts';
import { returnProductDetailsInitialState } from 'src/store/initialState';

const productDetailsReducer: TStoreProductDetailsReducer = (
	state = returnProductDetailsInitialState(),
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
				product: returnProductDetailsInitialState().product,
				loading: false,
				error,
			};
		}

		default: {
			return state;
		}
	}
};

export default productDetailsReducer;

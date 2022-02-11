import {
	PRODUCT_DETAILS_REQUEST_PENDING,
	PRODUCT_DETAILS_REQUEST_SUCCESS,
	PRODUCT_DETAILS_REQUEST_FAIL,
} from 'src/lib/core/constants';
import { TStoreProductDetailsReducer } from 'src/store/ts';
import { returnProductDetailsInitialState } from 'src/store/initialState';

const productDetailsInit = returnProductDetailsInitialState;

const productDetailsReducer: TStoreProductDetailsReducer = (
	state = productDetailsInit(),
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST_PENDING: {
			return { ...productDetailsInit(), isLoading: true };
		}

		case PRODUCT_DETAILS_REQUEST_SUCCESS: {
			const { product } = action.payload;

			return { ...productDetailsInit(), product };
		}

		case PRODUCT_DETAILS_REQUEST_FAIL: {
			const { error } = action.payload;
			return {
				...productDetailsInit(),
				error,
			};
		}

		default: {
			return state;
		}
	}
};

export default productDetailsReducer;

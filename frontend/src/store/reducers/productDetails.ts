import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/lib/core/constants';
import { TStoreProductDetailsReducer } from 'src/store/ts';
import { returnProductDetailsInitialState } from 'src/store/initialState';

const productDetailsReducer: TStoreProductDetailsReducer = (
	state = returnProductDetailsInitialState(),
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST: {
			return { ...returnProductDetailsInitialState(), isLoading: true };
		}

		case PRODUCT_DETAILS_SUCCESS: {
			const { product } = action.payload;

			return { ...returnProductDetailsInitialState(), product };
		}

		case PRODUCT_DETAILS_FAIL: {
			const { error } = action.payload;
			return {
				...returnProductDetailsInitialState(),
				error,
			};
		}

		default: {
			return state;
		}
	}
};

export default productDetailsReducer;

import {
	PRODUCT_DETAILS_REQUEST_PENDING,
	PRODUCT_DETAILS_REQUEST_SUCCESS,
	PRODUCT_DETAILS_REQUEST_FAIL,
	UPDATE_PRODUCT_DETAILS,
} from '@src/lib/core/constants';
import { TStoreProductDetailsReducer } from '@src/store/ts';
import { returnProductDetailsInitialState } from '@src/store/initialState';

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

			return { ...productDetailsInit(), isLoading: false, product };
		}

		case PRODUCT_DETAILS_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				...productDetailsInit(),
				isLoading: false,
				error,
			};
		}

		case UPDATE_PRODUCT_DETAILS: {
			const { newUpdatedData } = action.payload;

			if (!state.product) return state;

			return {
				...productDetailsInit(),
				isLoading: false,
				product: {
					...state.product,
					...newUpdatedData,
					updatedAt: new Date(),
				},
			};
		}

		default: {
			return state;
		}
	}
};

export default productDetailsReducer;

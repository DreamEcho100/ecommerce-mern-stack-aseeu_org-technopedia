import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/constants/productDetailsConstants';
import {
	STORE_PRODUCT_DETAILS_ACTION_TYPE,
	STORE_PRODUCT_DETAILS_STATE,
} from 'src/store/ts/types';
import { Reducer } from 'redux';

const initialState: STORE_PRODUCT_DETAILS_STATE = {
	product: {
		_id: '',
		name: '',
		image: '',
		description: '',
		brand: '',
		category: '',
		price: 0,
		countInStock: 0,
		rating: 0,
		numReviews: 0,
	},
	loading: false,
	error: '',
};

const productDetailsReducer: Reducer<
	STORE_PRODUCT_DETAILS_STATE,
	STORE_PRODUCT_DETAILS_ACTION_TYPE
> = (state = initialState, action) => {
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
			return { ...state, product: initialState.product, loading: false, error };
		}

		default:
			return state;
	}
};

export default productDetailsReducer;

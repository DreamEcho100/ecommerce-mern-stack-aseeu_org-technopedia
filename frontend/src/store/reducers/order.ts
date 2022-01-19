import {
	ORDER_CART_ITEMS_FAIL,
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_REQUEST,
} from 'src/constants';
import { TStoreOrderCartItemsReducer } from 'src/store/ts';
import { returnOrderInitialState } from 'src/store/initialState';

const productListReducer: TStoreOrderCartItemsReducer = (
	state = returnOrderInitialState(),
	action
) => {
	switch (action.type) {
		case ORDER_CART_ITEMS_REQUEST: {
			return {
				...state,
				...returnOrderInitialState(),
				isLoading: true,
			};
		}

		case ORDER_CART_ITEMS_SUCCESS: {
			const { order } = action.payload;

			return {
				...state,
				...returnOrderInitialState(),
				order: order,
			};
		}

		case ORDER_CART_ITEMS_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				...returnOrderInitialState(),
				error: error,
			};
		}

		default: {
			return state;
		}
	}
};

export default productListReducer;

import {
	ORDER_CREATE_CART_ITEMS_FAIL,
	ORDER_CREATE_CART_ITEMS_SUCCESS,
	ORDER_CREATE_CART_ITEMS_REQUEST,
	ORDERS_DETAILS_REQUEST,
	ORDERS_DETAILS_SUCCESS,
	ORDERS_DETAILS_FAIL,
} from 'src/lib/core/constants';
import {
	TOrdersDetailsReducer,
	TStoreOrderCreateCartItemsReducer,
} from 'src/store/ts';
import {
	returnOrderCreateInitialState,
	returnOrdersDetailsInitialState,
} from 'src/store/initialState';

export const orderCreate: TStoreOrderCreateCartItemsReducer = (
	state = returnOrderCreateInitialState(),
	action
) => {
	switch (action.type) {
		case ORDER_CREATE_CART_ITEMS_REQUEST: {
			return {
				// 	...state,
				...returnOrderCreateInitialState(),
				isLoading: true,
			};
		}

		case ORDER_CREATE_CART_ITEMS_SUCCESS: {
			const { data } = action.payload;

			return {
				// 	...state,
				...returnOrderCreateInitialState(),
				data: data,
				success: true,
			};
		}

		case ORDER_CREATE_CART_ITEMS_FAIL: {
			const { error } = action.payload;

			return {
				// 	...state,
				...returnOrderCreateInitialState(),
				error: error,
			};
		}

		default: {
			return state;
		}
	}
};

export const orderDetails: TOrdersDetailsReducer = (
	state = returnOrdersDetailsInitialState(),
	action
) => {
	switch (action.type) {
		case ORDERS_DETAILS_REQUEST: {
			return {
				// ...state,
				...returnOrdersDetailsInitialState(),
				isLoading: true,
			};
		}
		case ORDERS_DETAILS_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...returnOrdersDetailsInitialState(),
				data,
			};
		}
		case ORDERS_DETAILS_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...returnOrdersDetailsInitialState(),
				error,
			};
		}
		default: {
			return state;
		}
	}
};

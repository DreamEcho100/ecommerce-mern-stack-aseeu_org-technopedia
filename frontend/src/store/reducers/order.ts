import {
	ORDER_CREATE_CART_ITEMS_FAIL,
	ORDER_CREATE_CART_ITEMS_SUCCESS,
	ORDER_CREATE_CART_ITEMS_REQUEST,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	ORDERS_LIST_REQUEST,
	ORDERS_LIST_SUCCESS,
	ORDERS_LIST_FAIL,
} from 'src/lib/core/constants';
import {
	TOrderDetailsReducer,
	TStoreOrderCreateCartItemsReducer,
	TOrderPayReducer,
	TOrdersListReducer,
} from 'src/store/ts';
import {
	returnOrderCreateInitialState,
	returnOrderDetailsInitialState,
	returnOrderPayInitialState,
	returnOrdersListInitialState,
} from 'src/store/initialState';

export const orderCreateReducer: TStoreOrderCreateCartItemsReducer = (
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

export const orderDetailsReducer: TOrderDetailsReducer = (
	state = returnOrderDetailsInitialState(),
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST: {
			return {
				// ...state,
				...returnOrderDetailsInitialState(),
				isLoading: true,
			};
		}
		case ORDER_DETAILS_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...returnOrderDetailsInitialState(),
				data,
			};
		}
		case ORDER_DETAILS_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...returnOrderDetailsInitialState(),
				error,
			};
		}
		default: {
			return state;
		}
	}
};

export const orderPayReducer: TOrderPayReducer = (
	state = returnOrderPayInitialState(),
	action
) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST: {
			return {
				// ...state,
				...returnOrderPayInitialState(),
				isLoading: true,
			};
		}
		case ORDER_PAY_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...returnOrderPayInitialState(),
				data,
				success: true,
			};
		}
		case ORDER_PAY_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...returnOrderPayInitialState(),
				error,
			};
		}
		case ORDER_PAY_RESET: {
			return returnOrderPayInitialState();
		}
		default: {
			return state;
		}
	}
};

export const ordersListReducer: TOrdersListReducer = (
	state = returnOrdersListInitialState(),
	action
) => {
	switch (action.type) {
		case ORDERS_LIST_REQUEST: {
			return {
				// ...state,
				...returnOrdersListInitialState(),
				isLoading: true,
			};
		}
		case ORDERS_LIST_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...returnOrdersListInitialState(),
				isLoading: false,
				data,
			};
		}
		case ORDERS_LIST_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...returnOrdersListInitialState(),
				isLoading: false,
				error,
			};
		}
		default: {
			return state;
		}
	}
};

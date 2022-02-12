import {
	ORDER_CREATE_CART_ITEMS_REQUEST_FAIL,
	ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS,
	ORDER_CREATE_CART_ITEMS_REQUEST_PENDING,
	ORDER_DETAILS_REQUEST_PENDING,
	ORDER_DETAILS_REQUEST_SUCCESS,
	ORDER_DETAILS_REQUEST_FAIL,
	ORDER_DETAILS_RESET,
	ORDER_PAY_REQUEST_PENDING,
	ORDER_PAY_REQUEST_SUCCESS,
	ORDER_PAY_REQUEST_FAIL,
	ORDER_PAY_RESET,
	ORDERS_LIST_REQUEST_PENDING,
	ORDERS_LIST_REQUEST_SUCCESS,
	ORDERS_LIST_REQUEST_FAIL,
	ORDERS_LIST_RESET,
} from 'src/lib/core/constants';
import {
	TOrderDetailsReducer,
	TStoreOrderCreateCartItemsReducer,
	TOrderPayReducer,
	TOrdersListReducer,
} from 'src/store/ts';
import {
	returnOrderCreateInitialState as orderCreateInit,
	returnOrderDetailsInitialState as orderDetailsInit,
	returnOrderPayInitialState as orderPayInit,
	returnOrdersListInitialState as ordersListInit,
} from 'src/store/initialState';

export const orderCreateReducer: TStoreOrderCreateCartItemsReducer = (
	state = orderCreateInit(),
	action
) => {
	switch (action.type) {
		case ORDER_CREATE_CART_ITEMS_REQUEST_PENDING: {
			return {
				// 	...state,
				...orderCreateInit(),
				isLoading: true,
			};
		}

		case ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS: {
			const { data } = action.payload;

			return {
				// 	...state,
				...orderCreateInit(),
				data: data,
				success: true,
			};
		}

		case ORDER_CREATE_CART_ITEMS_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				// 	...state,
				...orderCreateInit(),
				error: error,
			};
		}

		default: {
			return state;
		}
	}
};

export const orderDetailsReducer: TOrderDetailsReducer = (
	state = orderDetailsInit(),
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST_PENDING: {
			return {
				// ...state,
				...orderDetailsInit(),
				isLoading: true,
			};
		}
		case ORDER_DETAILS_REQUEST_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...orderDetailsInit(),
				data,
			};
		}
		case ORDER_DETAILS_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...orderDetailsInit(),
				error,
			};
		}
		case ORDER_DETAILS_RESET: {
			return orderDetailsInit();
		}
		default: {
			return state;
		}
	}
};

export const orderPayReducer: TOrderPayReducer = (
	state = orderPayInit(),
	action
) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST_PENDING: {
			return {
				// ...state,
				...orderPayInit(),
				isLoading: true,
			};
		}
		case ORDER_PAY_REQUEST_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...orderPayInit(),
				data,
				success: true,
			};
		}
		case ORDER_PAY_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...orderPayInit(),
				error,
			};
		}
		case ORDER_PAY_RESET: {
			return orderPayInit();
		}
		default: {
			return state;
		}
	}
};

export const ordersListReducer: TOrdersListReducer = (
	state = ordersListInit(),
	action
) => {
	switch (action.type) {
		case ORDERS_LIST_REQUEST_PENDING: {
			return {
				// ...state,
				...ordersListInit(),
				isLoading: true,
			};
		}
		case ORDERS_LIST_REQUEST_SUCCESS: {
			const { data } = action.payload;

			return {
				// ...state,
				...ordersListInit(),
				isLoading: false,
				data,
			};
		}
		case ORDERS_LIST_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				...ordersListInit(),
				isLoading: false,
				error,
			};
		}
		case ORDERS_LIST_RESET: {
			return ordersListInit();
		}
		default: {
			return state;
		}
	}
};

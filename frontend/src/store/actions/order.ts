import {
	ORDER_CREATE_CART_ITEMS_REQUEST_PENDING,
	ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS,
	ORDER_CREATE_CART_ITEMS_REQUEST_FAIL,
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
	ICreateOrder,
	TGetOrderDetails,
	TGetOrdersList,
	TOrderDetailsReset,
	TOrdersListReset,
	TPayOrderAfterPayment,
	TPayOrderReset,
} from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';
import { IOrder, IOrderPay } from 'src/react-app-env';
import { handleActionThrowError } from 'src/lib/core/error';

export const createOrder: ICreateOrder =
	(orderCreate) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_CREATE_CART_ITEMS_REQUEST_PENDING,
			});

			const {
				user: { info: userInfo },
			} = getState();

			if (!userInfo || !userInfo._id) throw new Error('User token not found!');

			const data: IOrder = await fetch(`${BACK_END_ROOT_URL}/api/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
				body: JSON.stringify(orderCreate),
			}).then((response) => response.json());

			if (!data || !data._id) handleActionThrowError<typeof data>(data);

			dispatch({
				type: ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDER_CREATE_CART_ITEMS_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const getOrderDetails: TGetOrderDetails =
	(_id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_DETAILS_REQUEST_PENDING,
			});

			const {
				user: { info: userInfo },
			} = getState();

			if (!userInfo || !userInfo._id) throw new Error('User token not found!');

			const data: IOrder = await fetch(
				`${BACK_END_ROOT_URL}/api/orders/${_id}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${userInfo.token}`,
					},
				}
			).then((response) => response.json());

			if (!data || !data._id) handleActionThrowError<typeof data>(data);

			dispatch({
				type: ORDER_DETAILS_REQUEST_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDER_DETAILS_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const orderDetailsReset: TOrderDetailsReset = () => (dispatch) => {
	dispatch({
		type: ORDER_DETAILS_RESET,
	});
};

export const payOrderAfterPayment: TPayOrderAfterPayment =
	(orderId, paymentResults) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_PAY_REQUEST_PENDING,
			});

			const {
				user: { info: userInfo },
			} = getState();

			if (!userInfo || !userInfo._id) throw new Error('User token not found!');

			const data: IOrderPay = await fetch(
				`${BACK_END_ROOT_URL}/api/orders/${orderId}/pay`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
					body: JSON.stringify(paymentResults),
				}
			).then((response) => response.json());

			if (!data || !data._id) handleActionThrowError<typeof data>(data);

			// data.userRef = {
			// 	_id: data.userRef,
			// 	email: paymentResults.payer.email_address
			// };

			dispatch({
				type: ORDER_PAY_REQUEST_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDER_PAY_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const payOrderReset: TPayOrderReset = () => (dispatch) => {
	dispatch({
		type: ORDER_PAY_RESET,
	});
};

export const getOrdersList: TGetOrdersList =
	() => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDERS_LIST_REQUEST_PENDING,
			});

			const {
				user: { info: userInfo },
			} = getState();

			if (!userInfo || !userInfo._id) throw new Error('User token not found!');

			const data: IOrder[] = await fetch(
				`${BACK_END_ROOT_URL}/api/orders/myOrders`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				}
			).then((response) => response.json());

			if (!data || data.length === 0) handleActionThrowError<typeof data>(data);

			// data.userRef = {
			// 	_id: data.userRef,
			// 	email: paymentResults.payer.email_address
			// };

			dispatch({
				type: ORDERS_LIST_REQUEST_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDERS_LIST_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const OrdersListReset: TOrdersListReset = () => (dispatch) => {
	dispatch({
		type: ORDERS_LIST_RESET,
	});
};

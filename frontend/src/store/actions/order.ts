import {
	ORDER_CREATE_CART_ITEMS_REQUEST,
	ORDER_CREATE_CART_ITEMS_SUCCESS,
	ORDER_CREATE_CART_ITEMS_FAIL,
	ORDERS_DETAILS_REQUEST,
	ORDERS_DETAILS_SUCCESS,
	ORDERS_DETAILS_FAIL,
} from 'src/lib/core/constants';
import { ICreateOrder, TGetOrderDetails } from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';
import { IOrder } from 'src/react-app-env';

export const createOrder: ICreateOrder =
	(orderCreate) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_CREATE_CART_ITEMS_REQUEST,
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

			if (!data || !data._id)
				throw new Error(typeof data === 'string' ? data : JSON.stringify(data));

			dispatch({
				type: ORDER_CREATE_CART_ITEMS_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDER_CREATE_CART_ITEMS_FAIL,
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
				type: ORDERS_DETAILS_REQUEST,
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

			if (!data || !data._id || typeof data === 'string')
				throw new Error(typeof data !== 'object' ? data : JSON.stringify(data));

			dispatch({
				type: ORDERS_DETAILS_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDERS_DETAILS_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

import {
	ORDER_CART_ITEMS_REQUEST,
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_FAIL,
} from 'src/constants';
import { ICreateOrder } from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';
import { IOrder } from 'src/react-app-env';

export const createOrder: ICreateOrder =
	(order) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_CART_ITEMS_REQUEST,
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
				body: JSON.stringify(order),
			}).then((response) => response.json());

			if (typeof data !== 'object' || !data /* || !data._id*/)
				throw new Error(typeof data === 'string' ? data : JSON.stringify(data));

			dispatch({
				type: ORDER_CART_ITEMS_SUCCESS,
				payload: { data },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ORDER_CART_ITEMS_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

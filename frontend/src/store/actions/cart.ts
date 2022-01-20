import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from 'src/constants';
import {
	ISavePaymentMethod,
	TAddToCart,
	TRemoveFromCart,
	TSaveShippingAddress,
} from 'src/store/ts';
import ls from 'src/utils/v1/localStorage';
import { BACK_END_ROOT_URL } from 'src/config';
import { IProduct } from 'src/react-app-env';

export const addToCart: TAddToCart =
	(_id, quantity) => async (dispatch, getState) => {
		try {
			const data: IProduct = await fetch(
				`${BACK_END_ROOT_URL}/api/products/${_id}`
			).then((response) => response.json());

			localStorage.setItem(
				'cartItems',
				JSON.stringify(getState().cart.items || [])
			);

			dispatch({
				type: CART_ADD_ITEM,
				payload: {
					item: {
						_id: data._id,
						name: data.name,
						image: data.image,
						price: data.price,
						countInStock: data.countInStock,
						quantity,
					},
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				// dispatch({
				//   type: PRODUCT_DETAILS_FAIL,
				//   payload: { error: error.message },
				// });
				console.error(error.message);
			}
		}
	};

export const removeFromCart: TRemoveFromCart =
	(_id) => (dispatch, getState) => {
		ls.set('cartItems', JSON.stringify(getState().cart.items || []));

		dispatch({
			type: CART_REMOVE_ITEM,
			payload: { _id },
		});
	};

// export const saveCartItemsToLocalStorage = (
// 	items: IStoreCartState['items']
// ) => {
// 	ls.set('cartItems', items);
// };

export const saveShippingAddress: TSaveShippingAddress =
	(shippingAddress) => (dispatch) => {
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS,
			payload: { shippingAddress },
		});

		localStorage.setItem(
			'cartShippingAddress',
			JSON.stringify(shippingAddress)
		);
	};

export const savePaymentMethod: ISavePaymentMethod =
	(paymentMethod) => (dispatch) => {
		dispatch({
			type: CART_SAVE_PAYMENT_METHOD,
			payload: { paymentMethod },
		});

		localStorage.setItem('cartPaymentMethod', JSON.stringify(paymentMethod));
	};

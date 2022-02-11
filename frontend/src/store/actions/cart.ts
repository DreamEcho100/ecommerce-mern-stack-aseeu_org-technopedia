import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET,
} from 'src/lib/core/constants';
import {
	IResetCart,
	ISavePaymentMethod,
	TAddToCart,
	TRemoveFromCart,
	TSaveShippingAddress,
} from 'src/store/ts';
import ls from 'src/lib/utils/storage/localStorage';
import { BACK_END_ROOT_URL } from 'src/config';
import { IProduct } from 'src/react-app-env';
import { returnCartInitialState } from 'src/store/initialState';

export const addToCart: TAddToCart =
	(_id, quantity) => async (dispatch, getState) => {
		try {
			const data: IProduct = await fetch(
				`${BACK_END_ROOT_URL}/api/products/${_id}`
			).then((response) => response.json());

			ls.set('cartItems', JSON.stringify(getState().cart.items || []));

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
				//   type: PRODUCT_DETAILS_REQUEST_FAIL,
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

		ls.set('cartShippingAddress', JSON.stringify(shippingAddress));
	};

export const savePaymentMethod: ISavePaymentMethod =
	(paymentMethod) => (dispatch) => {
		dispatch({
			type: CART_SAVE_PAYMENT_METHOD,
			payload: { paymentMethod },
		});

		ls.set('cartPaymentMethod', JSON.stringify(paymentMethod));
	};

export const resetCart: IResetCart =
	({ resetShippingAddress, resetPaymentMethod } = {}) =>
	(dispatch) => {
		dispatch({
			type: CART_RESET,
			payload: { resetShippingAddress, resetPaymentMethod },
		});

		ls.set('cartItems', returnCartInitialState().items);

		if (resetShippingAddress)
			ls.set('cartShippingAddress', returnCartInitialState().shippingAddress);

		if (resetPaymentMethod)
			ls.set('cartPaymentMethod', returnCartInitialState().paymentMethod);
	};

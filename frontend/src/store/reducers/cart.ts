import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_RESET,
} from '@src/lib/core/constants';
import { TCartReducer } from '@src/store/ts';
import {
	handleReturnCartReducerInitialState,
	returnCartInitialState as cartInit,
} from '@src/store/initialState';
import { handleCartItemsCalcs } from '@src/lib/core/cart';

const cartReducer: TCartReducer = (
	state = handleReturnCartReducerInitialState(),
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM: {
			const { item } = action.payload;

			const existItem = state.items.find(
				(cartItem) => cartItem._id === item._id
			);

			const items = existItem
				? state.items.map((cartItem) =>
						cartItem._id === existItem._id ? item : cartItem
				  )
				: [...state.items, item];

			const cartItemsCalcs = handleCartItemsCalcs(items);

			return {
				...state,
				items,
				...cartItemsCalcs,
			};
		}

		case CART_REMOVE_ITEM: {
			const { _id } = action.payload;

			const items = state.items.filter((cartItem) => cartItem._id !== _id);

			const cartItemsCalcs = handleCartItemsCalcs(items);

			return {
				...state,
				items,
				...cartItemsCalcs,
			};
		}

		case CART_SAVE_SHIPPING_ADDRESS: {
			const { shippingAddress } = action.payload;

			return {
				...state,
				shippingAddress,
			};
		}

		case CART_SAVE_PAYMENT_METHOD: {
			const { paymentMethod } = action.payload;

			return {
				...state,
				paymentMethod,
			};
		}

		case CART_RESET: {
			const { resetShippingAddress, resetPaymentMethod } = action.payload;
			const cartRested = cartInit();

			return {
				...cartRested,
				shippingAddress: resetShippingAddress
					? cartRested.shippingAddress
					: state.shippingAddress,
				paymentMethod: resetPaymentMethod
					? cartRested.paymentMethod
					: state.paymentMethod,
			};
		}

		default: {
			return state;
		}
	}
};

export default cartReducer;

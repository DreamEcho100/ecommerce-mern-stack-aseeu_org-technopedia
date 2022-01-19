import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
} from 'src/constants';
import { TCartReducer } from 'src/store/ts';
import { returnCartInitialState } from 'src/store/initialState';

const cartReducer: TCartReducer = (
	state = returnCartInitialState(),
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM: {
			const { item } = action.payload;

			const existItem = state.items.find(
				(cartItem) => cartItem._id === item._id
			);

			if (existItem) {
				return {
					...state,
					items: state.items.map((cartItem) =>
						cartItem._id === existItem._id ? item : cartItem
					),
				};
			} else {
				return {
					...state,
					items: [...state.items, item],
				};
			}
		}

		case CART_REMOVE_ITEM: {
			const { _id } = action.payload;

			return {
				...state,
				items: state.items.filter((cartItem) => cartItem._id !== _id),
			};
		}

		case CART_SAVE_SHIPPING_ADDRESS: {
			const { shippingAddress } = action.payload;

			return {
				...state,
				shippingAddress,
			};
		}

		default: {
			return state;
		}
	}
};

export default cartReducer;

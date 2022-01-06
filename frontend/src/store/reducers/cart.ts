import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants';
import { TCartReducer } from 'src/store/ts';
import { cartInitialState } from 'src/store/initialState';

const cartReducer: TCartReducer = (state = cartInitialState, action) => {
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

		default:
			return state;
	}
};

export default cartReducer;

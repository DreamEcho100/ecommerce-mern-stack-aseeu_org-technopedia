import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants';
import { TCartDispatch, ICart } from 'src/store/ts';
import ls from 'src/utils/v1/localStorage';
import { BACK_END_ROOT_URL } from 'src/config';
import { TProduct } from 'src/react-app-env';
import { RootState } from 'src/store';

export const addToCart =
	(_id: ICart['_id'], quantity: ICart['quantity']) =>
	async (dispatch: TCartDispatch, getState: () => RootState) => {
		try {
			const data: TProduct = await fetch(
				`${BACK_END_ROOT_URL}/products/${_id}`
			).then((response) => response.json());

			localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));

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

export const removeFromCart =
	(_id: ICart['_id']) =>
	(dispatch: TCartDispatch, getState: () => RootState) => {
		ls.set('cartItems', JSON.stringify(getState().cart.items));

		dispatch({
			type: CART_REMOVE_ITEM,
			payload: { _id },
		});
	};

// export const saveCartItemsToLocalStorage = (
// 	items: ICartState['items']
// ) => {
// 	ls.set('cartItems', items);
// };

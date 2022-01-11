import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants';
import { TAddToCart, TRemoveFromCart } from 'src/store/ts';
import ls from 'src/utils/v1/localStorage';
import { BACK_END_ROOT_URL } from 'src/config';
import { IProduct } from 'src/react-app-env';

export const addToCart: TAddToCart =
	(_id, quantity) => async (dispatch, getState) => {
		try {
			const data: IProduct = await fetch(
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

export const removeFromCart: TRemoveFromCart =
	(_id) => (dispatch, getState) => {
		ls.set('cartItems', JSON.stringify(getState().cart.items));

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

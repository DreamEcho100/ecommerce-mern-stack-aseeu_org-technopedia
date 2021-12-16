import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants/cart';
import { STORE_CART_DISPATCH_TYPE, CART_ITEM_TYPE } from 'src/store/ts/types';
// import ls from 'src/utils/v1/localStorage';
import { BACK_END_ROOT_URL } from 'src/config';
import { Product } from 'src/react-app-env';
import { RootState } from 'src/store';

export const addToCart =
	(_id: CART_ITEM_TYPE['_id'], quantity: CART_ITEM_TYPE['quantity']) =>
	async (dispatch: STORE_CART_DISPATCH_TYPE, getState: () => RootState) => {
		try {
			const data: Product = await fetch(
				`${BACK_END_ROOT_URL}/products/${_id}`
			).then((response) => response.json());

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

			localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
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
	(_id: CART_ITEM_TYPE['_id']) =>
	(dispatch: STORE_CART_DISPATCH_TYPE, getState: () => RootState) => {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: { _id },
		});

		localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
	};

// export const saveCartItemsToLocalStorage = (
// 	items: STORE_CART_STATE['items']
// ) => {
// 	ls.set('cartItems', items);
// };

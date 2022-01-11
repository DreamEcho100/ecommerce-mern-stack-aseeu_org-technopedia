import {
	PRODUCTS_LIST_REQUEST,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_FAIL,
} from 'src/constants';
import { TProducts } from 'src/react-app-env';
import { THandleListProducts } from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';

export const handleListProducts: THandleListProducts =
	() => async (dispatch) => {
		try {
			dispatch({ type: PRODUCTS_LIST_REQUEST });

			const products: TProducts = await fetch(
				`${BACK_END_ROOT_URL}/products`
			).then((response) => response.json());

			dispatch({
				type: PRODUCTS_LIST_SUCCESS,
				payload: { products },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: PRODUCTS_LIST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

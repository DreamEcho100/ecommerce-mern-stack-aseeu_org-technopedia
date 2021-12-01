import {
	PRODUCTS_LIST_REQUEST,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_FAIL,
} from 'src/constants/productListConstants';
import { Products } from 'src/react-app-env';
import { STORE_PRODUCTS_LIST_DISPATCH_TYPE } from 'src/store/ts/types';
import { BACK_END_ROOT_URL } from 'src/config';

const listProducts =
	() => async (dispatch: STORE_PRODUCTS_LIST_DISPATCH_TYPE) => {
		try {
			dispatch({ type: PRODUCTS_LIST_REQUEST });

			const products: Products = await fetch(
				`${BACK_END_ROOT_URL}/api/v1/products`
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
			}
		}
	};

export default listProducts;

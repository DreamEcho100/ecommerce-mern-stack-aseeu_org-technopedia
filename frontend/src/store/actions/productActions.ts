import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from 'src/constants/productConstants';
import { Products } from 'src/react-app-env';
import { STORE_DISPATCH_TYPE } from 'src/store/ts/types';
import { BACK_END_ROOT_URL } from 'src/config';

export const listProducts = () => async (dispatch: STORE_DISPATCH_TYPE) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const products: Products = await fetch(
			`${BACK_END_ROOT_URL}/api/v1/products`
		).then((response) => response.json());

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: { products },
		});
	} catch (error) {
		if (error instanceof Error) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload: { error: error.message },
			});
		}
	}
};

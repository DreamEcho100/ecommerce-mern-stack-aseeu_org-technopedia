import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
} from 'src/constants/productDetails';
import { TProduct } from 'src/react-app-env';
import { STORE_PRODUCT_DETAILS_DISPATCH_TYPE } from 'src/store/ts/types';
import { BACK_END_ROOT_URL } from 'src/config';

const listProducts =
	(id: string) => async (dispatch: STORE_PRODUCT_DETAILS_DISPATCH_TYPE) => {
		try {
			dispatch({ type: PRODUCT_DETAILS_REQUEST });

			const product: TProduct = await fetch(
				`${BACK_END_ROOT_URL}/products/${id}`
			).then((response) => response.json());

			dispatch({
				type: PRODUCT_DETAILS_SUCCESS,
				payload: { product },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: PRODUCT_DETAILS_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export default listProducts;

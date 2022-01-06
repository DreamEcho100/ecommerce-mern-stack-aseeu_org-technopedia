import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
} from 'src/constants';
import { TProduct } from 'src/react-app-env';
import { TStoreProductDetailsDispatch } from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';

export const handleProductDetails =
	(id: string) => async (dispatch: TStoreProductDetailsDispatch) => {
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

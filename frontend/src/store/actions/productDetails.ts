import {
	PRODUCT_DETAILS_REQUEST_FAIL,
	PRODUCT_DETAILS_REQUEST_SUCCESS,
	PRODUCT_DETAILS_REQUEST_PENDING,
	UPDATE_PRODUCT_DETAILS,
} from 'src/lib/core/constants';
import { IProduct } from 'src/react-app-env';
import { THandleProductDetails, TUpdateProductDetails } from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';

export const handleProductDetails: THandleProductDetails =
	(id) => async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_DETAILS_REQUEST_PENDING });

			const product: IProduct = await fetch(
				`${BACK_END_ROOT_URL}/api/products/${id}`
			).then((response) => response.json());

			dispatch({
				type: PRODUCT_DETAILS_REQUEST_SUCCESS,
				payload: { product },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: PRODUCT_DETAILS_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const updateProductDetails: TUpdateProductDetails =
	(newUpdatedData) => (dispatch) => {
		dispatch({
			type: UPDATE_PRODUCT_DETAILS,
			payload: { newUpdatedData },
		});
	};

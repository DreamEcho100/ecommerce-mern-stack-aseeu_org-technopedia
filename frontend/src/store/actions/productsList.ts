import {
	PRODUCTS_LIST_REQUEST_PENDING,
	PRODUCTS_LIST_REQUEST_SUCCESS,
	PRODUCTS_LIST_REQUEST_FAIL,
	DELETE_PRODUCT_FROM_LIST,
	ADD_PRODUCT_TO_LIST,
	UPDATE_PRODUCT_IN_LIST,
} from '@src/lib/core/constants';
import { TProducts } from '@src/vite-env';
import {
	TAddProductToList,
	TDeleteProductFromList,
	THandleListProducts,
	TUpdateProductToList,
	// TUpdateProductFromList
} from '@src/store/ts';
import { BACK_END_ROOT_URL } from '@src/config';

export const handleListProducts: THandleListProducts =
	() => async (dispatch) => {
		try {
			dispatch({ type: PRODUCTS_LIST_REQUEST_PENDING });

			const products: TProducts = await fetch(
				`${BACK_END_ROOT_URL}/api/products`
			).then((response) => response.json());

			dispatch({
				type: PRODUCTS_LIST_REQUEST_SUCCESS,
				payload: { products },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: PRODUCTS_LIST_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const deleteProductFromList: TDeleteProductFromList =
	(_id) => (dispatch) => {
		dispatch({
			type: DELETE_PRODUCT_FROM_LIST,
			payload: { _id },
		});
	};

export const addProductToList: TAddProductToList =
	(newProductData) => (dispatch) => {
		dispatch({
			type: ADD_PRODUCT_TO_LIST,
			payload: { newProductData },
		});
	};

export const updateProductToList: TUpdateProductToList =
	(_id, newProductDataToUpdate) => (dispatch) => {
		dispatch({
			type: UPDATE_PRODUCT_IN_LIST,
			payload: { _id, newProductDataToUpdate },
		});
	};

import {
	PRODUCTS_LIST_REQUEST_FAIL,
	PRODUCTS_LIST_REQUEST_SUCCESS,
	PRODUCTS_LIST_REQUEST_PENDING,
	DELETE_PRODUCT_FROM_LIST,
	ADD_PRODUCT_TO_LIST,
} from '@src/lib/core/constants';
import { TStoreProductsListReducer } from '@src/store/ts';
import { returnProductListInitialState } from '@src/store/initialState';

const productListReducer: TStoreProductsListReducer = (
	state = returnProductListInitialState(),
	action
) => {
	switch (action.type) {
		case PRODUCTS_LIST_REQUEST_PENDING: {
			return {
				...returnProductListInitialState(),
				isLoading: true,
			};
		}

		case PRODUCTS_LIST_REQUEST_SUCCESS: {
			const { products } = action.payload;

			return {
				...returnProductListInitialState(),
				isLoading: false,
				products: products,
			};
		}

		case PRODUCTS_LIST_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				...returnProductListInitialState(),
				isLoading: false,
				error,
			};
		}

		case DELETE_PRODUCT_FROM_LIST: {
			const { _id } = action.payload;

			return {
				...returnProductListInitialState(),
				isLoading: false,
				products: state.products.filter((product) => product._id !== _id),
			};
		}

		case ADD_PRODUCT_TO_LIST: {
			const { newProductData } = action.payload;

			return {
				...returnProductListInitialState(),
				isLoading: false,
				products: [
					...state.products,
					newProductData,
					// {
					// 	...newProductData,
					// 	// user: new ObjectId("61a540d5f6f95f1cb9c872c3"),
					// 	// _id: new ObjectId("620f180e89742786a7dabe6e"),
					// 	_id: '',
					// 	userRef: '',
					// 	rating: 0,
					// 	numReviews: 0,
					// 	reviews: [],
					// 	createdAt: new Date(),
					// 	updatedAt: new Date(),
					// },
				],
			};
		}

		default: {
			return state;
		}
	}
};

export default productListReducer;

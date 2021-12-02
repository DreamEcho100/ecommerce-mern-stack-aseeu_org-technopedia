import ls from 'src/utils/v1/localStorage';
import {
	STORE_CART_STATE,
	STORE_PRODUCTS_LIST_STATE,
	STORE_PRODUCT_DETAILS_STATE,
	STORE_STATE,
} from '../ts/types';

export const productDetailsInitialState: STORE_PRODUCT_DETAILS_STATE = {
	product: {
		_id: '',
		name: '',
		image: '',
		description: '',
		brand: '',
		category: '',
		price: 0,
		countInStock: 0,
		rating: 0,
		numReviews: 0,
	},
	loading: false,
	error: '',
};

export const productListInitialState: STORE_PRODUCTS_LIST_STATE = {
	products: [],
	loading: false,
	error: '',
};

export const cartInitialState: STORE_CART_STATE = {
	items: ls.get<STORE_CART_STATE['items']>('cartItems', []),
};

const storeInitialState: STORE_STATE = {
	productDetails: productDetailsInitialState,
	productList: productListInitialState,
	cart: cartInitialState,
};

export default storeInitialState;

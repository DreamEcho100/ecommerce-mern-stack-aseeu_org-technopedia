import ls from 'src/utils/v1/localStorage';
import {
	T_USER_STATE,
	T_STORE_CART_STATE,
	T_STORE_PRODUCTS_LIST_STATE,
	T_STORE_PRODUCT_DETAILS_STATE,
	STORE_STATE,
} from '../ts/types';

export const userInitialState: T_USER_STATE = {
	info: ls.get<T_USER_STATE['info']>('userIno', {
		_id: '',
		name: '',
		email: '',
		password: '',
		isAdmin: false,
	}),
	loading: false,
	error: '',
};

export const productDetailsInitialState: T_STORE_PRODUCT_DETAILS_STATE = {
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

export const productListInitialState: T_STORE_PRODUCTS_LIST_STATE = {
	products: [],
	loading: false,
	error: '',
};

export const cartInitialState: T_STORE_CART_STATE = {
	items: ls.get<T_STORE_CART_STATE['items']>('cartItems', []),
};

const storeInitialState: STORE_STATE = {
	user: userInitialState,
	productDetails: productDetailsInitialState,
	productList: productListInitialState,
	cart: cartInitialState,
};

export default storeInitialState;

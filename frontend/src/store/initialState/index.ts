import ls from 'src/utils/v1/localStorage';
import {
	IUserState,
	ICartState,
	IStoreProductsListState,
	IStoreProductDetailsState,
	IStoreState,
} from '../ts';

export const userInitialState: IUserState = {
	info: ls.get<IUserState['info']>('userIno', {
		_id: '',
		name: '',
		email: '',
		password: '',
		isAdmin: false,
	}),
	loading: false,
	error: '',
};

export const productDetailsInitialState: IStoreProductDetailsState = {
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

export const productListInitialState: IStoreProductsListState = {
	products: [],
	loading: false,
	error: '',
};

export const cartInitialState: ICartState = {
	items: ls.get<ICartState['items']>('cartItems', []),
};

const storeInitialState: IStoreState = {
	user: userInitialState,
	productDetails: productDetailsInitialState,
	productList: productListInitialState,
	cart: cartInitialState,
};

export default storeInitialState;

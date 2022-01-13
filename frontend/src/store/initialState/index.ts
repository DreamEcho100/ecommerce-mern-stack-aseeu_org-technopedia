import ls from 'src/utils/v1/localStorage';
import {
	IStoreUserState,
	IStoreCartState,
	IStoreProductsListState,
	IStoreProductDetailsState,
	IStoreState,
} from '../ts';

export const returnUserInitialState = (): IStoreUserState => ({
	info: ls.get<IStoreUserState['info']>('userInfo', {
		_id: '',
		name: '',
		email: '',
		password: '',
		isAdmin: false,
		token: '',
	}),
	loading: false,
	error: '',
	actions: {
		requestUserDetails: {
			isLoading: false,
			error: '',
		},
		requestUpdateUserProfile: {
			isLoading: false,
			error: '',
		},
	},
});

export const returnProductDetailsInitialState =
	(): IStoreProductDetailsState => ({
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
	});

export const returnProductListInitialState = (): IStoreProductsListState => ({
	products: [],
	loading: false,
	error: '',
});

export const returnCartInitialState = (): IStoreCartState => ({
	items: ls.get<IStoreCartState['items']>('cartItems', []),
});

const storeInitialState: IStoreState = {
	user: returnUserInitialState(),
	productDetails: returnProductDetailsInitialState(),
	productList: returnProductListInitialState(),
	cart: returnCartInitialState(),
};

export default storeInitialState;

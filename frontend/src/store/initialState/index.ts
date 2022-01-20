// import { IProduct } from 'src/react-app-env';
import { handleCartItemsCalcs } from 'src/utils/v1/core/cart';
import ls from 'src/utils/v1/localStorage';
import {
	IStoreUserState,
	IStoreCartState,
	IStoreProductsListState,
	IStoreProductDetailsState,
	IStoreState,
	IStoreOrderState,
} from '../ts';

interface IItemTemp {
	price: string;
	countInStock: string;
	rating: string;
	numReviews: string;
}

const userInfo: IStoreUserState['info'] = ls.get<IStoreUserState['info']>(
	'userInfo',
	{
		_id: '',
		name: '',
		email: '',
		password: '',
		isAdmin: false,
		token: '',
	}
);

export const returnUserInitialState = (): IStoreUserState => ({
	info: userInfo,
	isLoading: false,
	error: '',
	actions: {
		requestUserDetails: {
			isLoading: false,
			error: '',
			success: false,
		},
		requestUpdateUserProfile: {
			isLoading: false,
			error: '',
			success: false,
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
		isLoading: false,
		error: '',
	});

export const returnProductListInitialState = (): IStoreProductsListState => ({
	products: [],
	isLoading: false,
	error: '',
});

const items: IStoreCartState['items'] = ls
	.get<IStoreCartState['items']>('cartItems', [])
	.map((item) => {
		const itemTemp = item as unknown as IItemTemp;
		item.price = parseFloat(itemTemp.price);
		item.countInStock = parseFloat(itemTemp.countInStock);
		// item.rating = parseFloat(itemTemp.rating) as typeof item.rating;
		// item.numReviews = parseFloat(itemTemp.numReviews);

		return item;
	}) as IStoreCartState['items'];

export const returnCartInitialState = (): IStoreCartState => ({
	items,
	shippingAddress: ls.get<IStoreCartState['shippingAddress']>(
		'cartShippingAddress',
		{
			address: '',
			city: '',
			postalCode: '',
			country: '',
		}
	),
	paymentMethod: ls.get<IStoreCartState['paymentMethod']>(
		'cartPaymentMethod',
		'PayPal'
	),
	...handleCartItemsCalcs(items),
});

export const returnOrderInitialState = (): IStoreOrderState => ({
	data: undefined,
	isLoading: false,
	error: '',
	success: false,
});

const storeInitialState: IStoreState = {
	user: returnUserInitialState(),
	productDetails: returnProductDetailsInitialState(),
	productList: returnProductListInitialState(),
	cart: returnCartInitialState(),
	order: returnOrderInitialState(),
};

export default storeInitialState;

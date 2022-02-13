// import { IProduct } from 'src/react-app-env';
import { handleCartItemsCalcs } from 'src/lib/core/cart';
import ls from 'src/lib/utils/storage/localStorage';
import {
	IStoreUserState,
	IStoreCartState,
	IStoreProductsListState,
	IStoreProductDetailsState,
	IStoreState,
	IStoreOrderCreateState,
	IStoreOrderDetailsState,
	IStoreOrderPayState,
	IStoreOrdersListState,
	TStoreAdminState,
} from '../ts';

interface IItemTemp {
	price: string;
	countInStock: string;
	rating: string;
	numReviews: string;
}

type TReturnAdminInitialState = (isAdmin?: boolean) => TStoreAdminState | null;

export const returnUserInfoInitialState = (): IStoreUserState['info'] => ({
	_id: '',
	name: '',
	email: '',
	password: '',
	isAdmin: false,
	token: '',
});
export const returnUserInitialState = (): IStoreUserState => ({
	info: returnUserInfoInitialState(),
	isLoading: false,
	error: '',
	actions: {
		requests: {
			userDetails: {
				isLoading: false,
				error: '',
				success: false,
			},
			updateUserProfile: {
				isLoading: false,
				error: '',
				success: false,
			},
		},
	},
});
export const handleReturningUserReducerInitialState = (): IStoreUserState => ({
	...returnUserInitialState(),
	info: ls.get<IStoreUserState['info']>(
		'userInfo',
		returnUserInfoInitialState()
	),
});

export const returnAdminInitialState: TReturnAdminInitialState = (
	isAdmin = returnUserInitialState().info?.isAdmin || false
) =>
	isAdmin
		? {
				usersList: [],
				actions: {
					requests: {
						deleteUser: {
							error: '',
							isLoading: false,
							success: false,
						},
						usersList: {
							error: '',
							isLoading: false,
							success: false,
						},
					},
				},
		  }
		: null;

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
		isLoading: true,
		error: '',
	});

export const returnProductListInitialState = (): IStoreProductsListState => ({
	products: [],
	isLoading: true,
	error: '',
});

export const returnCartInitialState = (): IStoreCartState => ({
	items: [],
	itemsPrice: '00.00',
	shippingPrice: '00.00',
	taxPrice: '00.00',
	totalPrice: '00.00',
	shippingAddress: {
		address: '',
		city: '',
		postalCode: '',
		country: '',
	},
	paymentMethod: 'PayPal',
});
const returnCartItemsInitialState = (): IStoreCartState['items'] => [];
const handleReturnCartItemsInitialStateFromLocalStorage =
	(): IStoreCartState['items'] =>
		ls
			.get<IStoreCartState['items']>('cartItems', returnCartItemsInitialState())
			.map((item) => {
				const itemTemp = item as unknown as IItemTemp;
				item.price = parseFloat(itemTemp.price);
				item.countInStock = parseFloat(itemTemp.countInStock);
				// item.rating = parseFloat(itemTemp.rating) as typeof item.rating;
				// item.numReviews = parseFloat(itemTemp.numReviews);

				return item;
			}) as IStoreCartState['items'];
export const handleReturnCartReducerInitialState = (): IStoreCartState => ({
	...returnCartInitialState(),
	items: handleReturnCartItemsInitialStateFromLocalStorage(),
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
	...handleCartItemsCalcs(handleReturnCartItemsInitialStateFromLocalStorage()),
});

export const returnOrderCreateInitialState = (): IStoreOrderCreateState => ({
	data: undefined,
	isLoading: false,
	error: '',
	success: false,
});

export const returnOrderDetailsInitialState = (): IStoreOrderDetailsState => ({
	// data: {},
	isLoading: true,
	error: '',
});

export const returnOrderPayInitialState = (): IStoreOrderPayState => ({
	// data: {},
	isLoading: true,
	error: '',
	success: false,
});

export const returnOrdersListInitialState = (): IStoreOrdersListState => ({
	data: [],
	error: '',
	isLoading: true,
});

const storeInitialState: IStoreState = {
	user: handleReturningUserReducerInitialState(), // returnUserInitialState(),
	admin: returnAdminInitialState(),
	productDetails: returnProductDetailsInitialState(),
	productList: returnProductListInitialState(),
	cart: returnCartInitialState(),
	orderCreate: returnOrderCreateInitialState(),
	orderDetails: returnOrderDetailsInitialState(),
	orderPay: returnOrderPayInitialState(),
	ordersList: returnOrdersListInitialState(),
};

export default storeInitialState;

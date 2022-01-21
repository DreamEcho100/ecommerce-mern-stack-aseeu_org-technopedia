import { Reducer } from 'redux';
import {
	ICartItem,
	IProduct,
	TProducts,
	IUser,
	IShippingAddress,
	TPaymentMethod,
	IOrder,
} from 'src/react-app-env';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_RESET,
	//
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
	//
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	//
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	ORDER_CART_ITEMS_REQUEST,
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_FAIL,
} from 'src/lib/core/constants';
import { TRootState } from 'src/store';

/* ************************ */
/***** USER *****/
/* ************************ */

export interface IStoreUserState {
	info?: IUser;
	isLoading: boolean;
	error: string;
	actions: {
		requestUserDetails: {
			isLoading: boolean;
			error: string;
			success: boolean;
		};
		requestUpdateUserProfile: {
			isLoading: boolean;
			error: string;
			success: boolean;
		};
	};
}

export type IUserAction =
	| {
			type:
				| typeof USER_LOGIN_REQUEST
				| typeof USER_REGISTER_REQUEST
				| typeof USER_LOGOUT
				| typeof USER_DETAILS_REQUEST
				| typeof USER_UPDATE_PROFILE_REQUEST;
	  }
	| {
			type:
				| typeof USER_LOGIN_SUCCESS
				| typeof USER_REGISTER_SUCCESS
				| typeof USER_DETAILS_SUCCESS
				| typeof USER_UPDATE_PROFILE_SUCCESS;
			payload: { info: IUser };
	  }
	| {
			type:
				| typeof USER_LOGIN_FAIL
				| typeof USER_REGISTER_FAIL
				| typeof USER_DETAILS_FAIL
				| typeof USER_UPDATE_PROFILE_FAIL;
			payload: { error: string };
	  }
	| {
			type: typeof USER_UPDATE_PROFILE_RESET;
			payload: {};
	  };

export type IUserReducer = Reducer<IStoreUserState, IUserAction>;

type IUserDispatch =
	| React.Dispatch<IUserAction>
	| ((value: IUserAction) => IStoreUserState);
export type THandleUserLogin = (
	email: string,
	password: string
) => (dispatch: IUserDispatch, getState: () => TRootState) => Promise<void>;
export type THandleUserRegister = (
	name: string,
	email: string,
	password: string
) => (dispatch: IUserDispatch, getState: () => TRootState) => Promise<void>;
export type THandleUserLogout = () => (dispatch: IUserDispatch) => void;
export type TGetUserDetails = (
	_id: IUser['_id']
) => (dispatch: IUserDispatch, getState: () => TRootState) => Promise<void>;
export type TUpdateUserProfile = (userUpdatedInfo: {
	_id?: IUser['_id'];
	name?: IUser['name'];
	email?: IUser['email'];
	password?: IUser['password'];
}) => (dispatch: IUserDispatch, getState: () => TRootState) => Promise<void>;

/* ************************ */
/****** PRODUCTS LIST ******/
/* ************************ */
export interface IStoreProductsListState {
	products?: TProducts;
	isLoading: boolean;
	error: string;
}

export type TStoreProductsListAction =
	| { type: typeof PRODUCTS_LIST_REQUEST }
	| {
			type: typeof PRODUCTS_LIST_SUCCESS;
			payload: { products: IStoreProductsListState['products'] };
	  }
	| {
			type: typeof PRODUCTS_LIST_FAIL;
			payload: { error: IStoreProductsListState['error'] };
	  };

export type TStoreProductsListReducer = Reducer<
	IStoreProductsListState,
	TStoreProductsListAction
>;

type TStoreProductsListDispatch =
	| React.Dispatch<TStoreProductsListAction>
	| ((value: TStoreProductsListAction) => IStoreProductsListState);
export type THandleListProducts = () => (
	dispatch: TStoreProductsListDispatch
) => Promise<void>;

/* ************************ */
/***** PRODUCTS DETAIL *****/
/* ************************ */
export interface IStoreProductDetailsState {
	product?: IProduct;
	isLoading: boolean;
	error: string;
}

export type TStoreProductDetailsAction =
	| { type: typeof PRODUCT_DETAILS_REQUEST }
	| {
			type: typeof PRODUCT_DETAILS_SUCCESS;
			payload: { product: IStoreProductDetailsState['product'] };
	  }
	| {
			type: typeof PRODUCT_DETAILS_FAIL;
			payload: { error: IStoreProductDetailsState['error'] };
	  };

export type TStoreProductDetailsReducer = Reducer<
	IStoreProductDetailsState,
	TStoreProductDetailsAction
>;

type TStoreProductDetailsDispatch =
	| React.Dispatch<TStoreProductDetailsAction>
	| ((value: TStoreProductDetailsAction) => IStoreProductDetailsState);
export type THandleProductDetails = (
	id: string
) => (dispatch: TStoreProductDetailsDispatch) => Promise<void>;

/* ************************ */
/***** CART *****/
/* ************************ */

export interface IStoreCartState {
	items: ICartItem[];
	shippingAddress: IShippingAddress;
	paymentMethod: TPaymentMethod;
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
}

export type TCartAction =
	| {
			type: typeof CART_ADD_ITEM;
			payload: { item: ICartItem };
	  }
	| {
			type: typeof CART_REMOVE_ITEM;
			payload: { _id: ICartItem['_id'] };
	  }
	| {
			type: typeof CART_SAVE_SHIPPING_ADDRESS;
			payload: { shippingAddress: IShippingAddress };
	  }
	| {
			type: typeof CART_SAVE_PAYMENT_METHOD;
			payload: { paymentMethod: TPaymentMethod };
	  }
	| {
			type: typeof ORDER_CART_ITEMS_REQUEST;
			payload: {};
	  }
	| {
			type: typeof ORDER_CART_ITEMS_SUCCESS;
			payload: { order: IOrder };
	  }
	| {
			type: typeof ORDER_CART_ITEMS_FAIL;
			payload: {};
	  };

export type TCartReducer = Reducer<IStoreCartState, TCartAction>;

type TCartDispatch =
	| React.Dispatch<TCartAction>
	| ((value: TCartAction) => IStoreCartState);
export type TAddToCart = (
	_id: ICartItem['_id'],
	quantity: ICartItem['quantity']
) => (dispatch: TCartDispatch, getState: () => TRootState) => Promise<void>;
export type TRemoveFromCart = (
	_id: ICartItem['_id']
) => (dispatch: TCartDispatch, getState: () => TRootState) => void;
export type TSaveShippingAddress = (
	shippingAddress: IShippingAddress
) => (dispatch: TCartDispatch) => void;

export type ISavePaymentMethod = (
	paymentMethod: TPaymentMethod
) => (dispatch: TCartDispatch) => void;

/* ************************ */
/***** ORDER *****/
/* ************************ */

export interface IStoreOrderState {
	data?: IOrder;
	isLoading: boolean;
	error: string;
	success: boolean;
}
export type TOrderAction =
	| { type: typeof ORDER_CART_ITEMS_REQUEST }
	| {
			type: typeof ORDER_CART_ITEMS_SUCCESS;
			payload: { data: IOrder };
	  }
	| {
			type: typeof ORDER_CART_ITEMS_FAIL;
			payload: { error: IStoreOrderState['error'] };
	  };

export type TOrderReducer = Reducer<IStoreOrderState, TOrderAction>;

export type TStoreOrderCartItemsReducer = Reducer<
	IStoreOrderState,
	TOrderAction
>;

type TOrderDispatch =
	| React.Dispatch<TOrderAction>
	| ((value: TOrderAction) => IStoreOrderState);
export type ICreateOrder = (data: {
	items: IOrder['items'];
	shippingAddress: IOrder['shippingAddress'];
	paymentMethod: IOrder['paymentMethod'];
	itemsPrice: IOrder['itemsPrice'];
	shippingPrice: IOrder['shippingPrice'];
	taxPrice: IOrder['taxPrice'];
	totalPrice: IOrder['totalPrice'];
}) => (dispatch: TOrderDispatch, getState: () => TRootState) => void;

/* ************************ */
/******* STORE STATE *******/
/* ************************ */
export interface IStoreState {
	user: IStoreUserState;
	productList: IStoreProductsListState;
	productDetails: IStoreProductDetailsState;
	cart: IStoreCartState;
	order: IStoreOrderState;
}

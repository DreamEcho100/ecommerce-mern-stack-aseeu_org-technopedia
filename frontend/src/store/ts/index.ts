import { Reducer } from 'redux';
import { ICart, IProduct, TProducts, IUser } from 'src/react-app-env';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants/cart';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
	//
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
	//
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	//
} from 'src/constants';
import { TRootState } from 'src/store';

/* ************************ */
/****** PRODUCTS LIST ******/
/* ************************ */
export interface IStoreProductsListState {
	products: TProducts | [];
	loading: boolean;
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
	product: IProduct;
	loading: boolean;
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
	items: ICart[] | [];
}

export type TCartAction =
	| {
			type: typeof CART_ADD_ITEM;
			payload: { item: ICart };
	  }
	| {
			type: typeof CART_REMOVE_ITEM;
			payload: { _id: ICart['_id'] };
	  };

export type TCartReducer = Reducer<IStoreCartState, TCartAction>;

type TCartDispatch =
	| React.Dispatch<TCartAction>
	| ((value: TCartAction) => IStoreCartState);
export type TAddToCart = (
	_id: ICart['_id'],
	quantity: ICart['quantity']
) => (dispatch: TCartDispatch, getState: () => TRootState) => Promise<void>;
export type TRemoveFromCart = (
	_id: ICart['_id']
) => (dispatch: TCartDispatch, getState: () => TRootState) => void;

/* ************************ */
/***** USER *****/
/* ************************ */

export interface IStoreUserState {
	info: IUser;
	loading: boolean;
	error: string;
}

export type IUserAction =
	| {
			type: typeof USER_LOGIN_REQUEST | typeof USER_REGISTER_REQUEST;
	  }
	| {
			type: typeof USER_LOGIN_SUCCESS | typeof USER_REGISTER_SUCCESS;
			payload: { info: IUser };
	  }
	| {
			type: typeof USER_LOGIN_FAIL | typeof USER_REGISTER_FAIL;
			payload: { error: string };
	  }
	| {
			type: typeof USER_LOGOUT;
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
export type THandleUserLogout = () => (
	dispatch: IUserDispatch,
	getState: () => TRootState
) => void;

/* ************************ */
/******* STORE STATE *******/
/* ************************ */
export interface IStoreState {
	user: IStoreUserState;
	productList: IStoreProductsListState;
	productDetails: IStoreProductDetailsState;
	cart: IStoreCartState;
}

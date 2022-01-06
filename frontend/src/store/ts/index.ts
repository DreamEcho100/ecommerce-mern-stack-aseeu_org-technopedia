import { TProduct, TProducts, TUser } from 'src/react-app-env';
import {
	//
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
} from 'src/constants/productList';
import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from 'src/constants/productDetails';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from 'src/constants/cart';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from 'src/constants';
import { Reducer } from 'redux';

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

export type TStoreProductsListDispatch =
	| React.Dispatch<TStoreProductsListAction>
	| ((value: TStoreProductsListAction) => IStoreProductsListState);

export type TStoreProductsListReducer = Reducer<
	IStoreProductsListState,
	TStoreProductsListAction
>;

/* ************************ */
/***** PRODUCTS DETAIL *****/
/* ************************ */
export interface IStoreProductDetailsState {
	product: TProduct;
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

export type TStoreProductDetailsDispatch =
	| React.Dispatch<TStoreProductDetailsAction>
	| ((value: TStoreProductDetailsAction) => IStoreProductDetailsState);

export type TStoreProductDetailsReducer = Reducer<
	IStoreProductDetailsState,
	TStoreProductDetailsAction
>;

/* ************************ */
/***** CART *****/
/* ************************ */
export interface ICart {
	_id: TProduct['_id'];
	name: TProduct['name'];
	image: TProduct['image'];
	price: TProduct['price'];
	countInStock: TProduct['countInStock'];
	quantity: number;
}

export interface ICartState {
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

export type TCartDispatch =
	| React.Dispatch<TCartAction>
	| ((value: TCartAction) => ICartState);

export type TCartReducer = Reducer<ICartState, TCartAction>;

/* ************************ */
/***** USER *****/
/* ************************ */

export interface IUserState {
	info: TUser;
	loading: boolean;
	error: string;
}

export type TUserAction =
	| {
			type: typeof USER_LOGIN_REQUEST;
	  }
	| {
			type: typeof USER_LOGIN_SUCCESS;
			payload: { info: TUser };
	  }
	| {
			type: typeof USER_LOGIN_FAIL;
			payload: { error: string };
	  }
	| {
			type: typeof USER_LOGOUT;
	  };

export type TUserDispatch =
	| React.Dispatch<TUserAction>
	| ((value: TUserAction) => IUserState);

export type TUserReducer = Reducer<IUserState, TUserAction>;

/* ************************ */
/******* STORE STATE *******/
/* ************************ */
export interface IStoreState {
	user: IUserState;
	productList: IStoreProductsListState;
	productDetails: IStoreProductDetailsState;
	cart: ICartState;
}

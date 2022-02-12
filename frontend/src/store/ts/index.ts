import { Reducer } from 'redux';
import {
	ICartItem,
	IProduct,
	TProducts,
	IUser,
	IShippingAddress,
	TPaymentMethod,
	IOrder,
	IOrderPay,
	IAdmin,
} from 'src/react-app-env';
import {
	USER_LOGIN_REQUEST_PENDING,
	USER_LOGIN_REQUEST_SUCCESS,
	USER_LOGIN_REQUEST_FAIL,
	USER_REGISTER_REQUEST_PENDING,
	USER_REGISTER_REQUEST_SUCCESS,
	USER_REGISTER_REQUEST_FAIL,
	USER_LOGOUT,
	USER_DETAILS_REQUEST_PENDING,
	USER_DETAILS_REQUEST_SUCCESS,
	USER_DETAILS_REQUEST_FAIL,
	USER_UPDATE_PROFILE_REQUEST_PENDING,
	USER_UPDATE_PROFILE_REQUEST_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST_FAIL,
	USER_UPDATE_PROFILE_RESET,
	ADMIN_USERS_LIST_REQUEST_PENDING,
	ADMIN_USERS_LIST_REQUEST_SUCCESS,
	ADMIN_USERS_LIST_REQUEST_FAIL,
	ADMIN_USERS_LIST_RESET,
	ADMIN_DELETE_USER_REQUEST_PENDING,
	ADMIN_DELETE_USER_REQUEST_SUCCESS,
	ADMIN_DELETE_USER_REQUEST_FAIL,
	//
	PRODUCTS_LIST_REQUEST_FAIL,
	PRODUCTS_LIST_REQUEST_SUCCESS,
	PRODUCTS_LIST_REQUEST_PENDING,
	//
	PRODUCT_DETAILS_REQUEST_PENDING,
	PRODUCT_DETAILS_REQUEST_SUCCESS,
	PRODUCT_DETAILS_REQUEST_FAIL,
	//
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET,
	//
	ORDER_CREATE_CART_ITEMS_REQUEST_PENDING,
	ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS,
	ORDER_CREATE_CART_ITEMS_REQUEST_FAIL,
	ORDER_DETAILS_REQUEST_PENDING,
	ORDER_DETAILS_REQUEST_SUCCESS,
	ORDER_DETAILS_REQUEST_FAIL,
	ORDER_DETAILS_RESET,
	ORDER_PAY_REQUEST_PENDING,
	ORDER_PAY_REQUEST_SUCCESS,
	ORDER_PAY_REQUEST_FAIL,
	ORDER_PAY_RESET,
	ORDERS_LIST_REQUEST_PENDING,
	ORDERS_LIST_REQUEST_SUCCESS,
	ORDERS_LIST_REQUEST_FAIL,
	ORDERS_LIST_RESET,
	USER_IS_NOT_ADMIN,
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
		requests: {
			userDetails: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			updateUserProfile: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
		};
	};
}

interface IUserRequestAction {
	type:
		| typeof USER_LOGIN_REQUEST_PENDING
		| typeof USER_REGISTER_REQUEST_PENDING
		| typeof USER_LOGOUT
		| typeof USER_DETAILS_REQUEST_PENDING
		| typeof USER_UPDATE_PROFILE_REQUEST_PENDING;
}
interface IUserRequestSuccessAction {
	type:
		| typeof USER_LOGIN_REQUEST_SUCCESS
		| typeof USER_REGISTER_REQUEST_SUCCESS
		| typeof USER_DETAILS_REQUEST_SUCCESS
		| typeof USER_UPDATE_PROFILE_REQUEST_SUCCESS;
	payload: { info: IUser };
}
interface IUserRequestFailAction {
	type:
		| typeof USER_LOGIN_REQUEST_FAIL
		| typeof USER_REGISTER_REQUEST_FAIL
		| typeof USER_DETAILS_REQUEST_FAIL
		| typeof USER_UPDATE_PROFILE_REQUEST_FAIL;
	payload: { error: string };
}
interface IUserUpdateProfileResetAction {
	type: typeof USER_UPDATE_PROFILE_RESET;
}
export type IUserAction =
	| IUserRequestAction
	| IUserRequestSuccessAction
	| IUserRequestFailAction
	| IUserUpdateProfileResetAction;

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
/***** ADMIN *****/
/* ************************ */
export type TStoreAdminState = IAdmin | null;

interface IAdminUsersListRequestPendingAction {
	type: typeof ADMIN_USERS_LIST_REQUEST_PENDING;
	payload: { isAdmin: boolean };
}
interface IAdminUsersListRequestSuccussAction {
	type: typeof ADMIN_USERS_LIST_REQUEST_SUCCESS;
	payload: { isAdmin: boolean; usersList: IUser[] };
}
interface IAdminUsersListRequestFailAction {
	type: typeof ADMIN_USERS_LIST_REQUEST_FAIL;
	payload: { error: string };
}
interface IAdminUserListResetAction {
	type: typeof ADMIN_USERS_LIST_RESET;
}
interface IUserIsNotAdmin {
	type: typeof USER_IS_NOT_ADMIN;
}
interface IAdminDeleteUserRequestPendingAction {
	type: typeof ADMIN_DELETE_USER_REQUEST_PENDING;
	payload: { isAdmin: boolean };
}
interface IAdminDeleteUserRequestSuccussAction {
	type: typeof ADMIN_DELETE_USER_REQUEST_SUCCESS;
	payload: { isAdmin: boolean; _id: IUser['_id'] };
}
interface IAdminDeleteUserRequestFailAction {
	type: typeof ADMIN_DELETE_USER_REQUEST_FAIL;
	payload: { error: string };
}

export type IUsersListAction =
	| IAdminUsersListRequestPendingAction
	| IAdminUsersListRequestSuccussAction
	| IAdminUsersListRequestFailAction
	| IAdminUserListResetAction
	| IUserIsNotAdmin
	| IAdminDeleteUserRequestPendingAction
	| IAdminDeleteUserRequestSuccussAction
	| IAdminDeleteUserRequestFailAction;

export type IAdminReducer = Reducer<TStoreAdminState, IUsersListAction>;

type IAdminDispatch =
	| React.Dispatch<IUsersListAction>
	| ((value: IUsersListAction) => TStoreAdminState);
export type TAdminReset = () => (dispatch: IAdminDispatch) => void;
export type TAdminGetUsersList = () => (
	dispatch: IAdminDispatch,
	getState: () => TRootState
) => Promise<void>;
export type TAdminDeleteUser = (
	_id: IUser['_id']
) => (dispatch: IAdminDispatch, getState: () => TRootState) => Promise<void>;

/* ************************ */
/****** PRODUCTS LIST ******/
/* ************************ */
export interface IStoreProductsListState {
	products?: TProducts;
	isLoading: boolean;
	error: string;
}

interface IProductsListRequestAction {
	type: typeof PRODUCTS_LIST_REQUEST_PENDING;
}
interface IProductsListRequestSuccessAction {
	type: typeof PRODUCTS_LIST_REQUEST_SUCCESS;
	payload: { products: IStoreProductsListState['products'] };
}
interface IProductsListRequestFailAction {
	type: typeof PRODUCTS_LIST_REQUEST_FAIL;
	payload: { error: IStoreProductsListState['error'] };
}
export type TStoreProductsListAction =
	| IProductsListRequestAction
	| IProductsListRequestSuccessAction
	| IProductsListRequestFailAction;

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

interface IProductDetailsRequestAction {
	type: typeof PRODUCT_DETAILS_REQUEST_PENDING;
}
interface IProductDetailsRequestSuccessAction {
	type: typeof PRODUCT_DETAILS_REQUEST_SUCCESS;
	payload: { product: IStoreProductDetailsState['product'] };
}
interface IProductDetailsRequestFailAction {
	type: typeof PRODUCT_DETAILS_REQUEST_FAIL;
	payload: { error: IStoreProductDetailsState['error'] };
}
export type TStoreProductDetailsAction =
	| IProductDetailsRequestAction
	| IProductDetailsRequestSuccessAction
	| IProductDetailsRequestFailAction;

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

interface ICartAddItemAction {
	type: typeof CART_ADD_ITEM;
	payload: { item: ICartItem };
}
interface ICartRemoveItemAction {
	type: typeof CART_REMOVE_ITEM;
	payload: { _id: ICartItem['_id'] };
}
interface ICartSaveShippingAddressAction {
	type: typeof CART_SAVE_SHIPPING_ADDRESS;
	payload: { shippingAddress: IShippingAddress };
}
interface ICartSavePaymentMethodAction {
	type: typeof CART_SAVE_PAYMENT_METHOD;
	payload: { paymentMethod: TPaymentMethod };
}
interface ICreateCartItemsRequestAction {
	type: typeof ORDER_CREATE_CART_ITEMS_REQUEST_PENDING;
}
interface ICreateCartItemsRequestSuccessAction {
	type: typeof ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS;
	payload: { orderCreate: IOrder };
}
interface ICreateCartItemsRequestFailAction {
	type: typeof ORDER_CREATE_CART_ITEMS_REQUEST_FAIL;
}
interface ICartResetAction {
	type: typeof CART_RESET;
	payload: { resetShippingAddress?: boolean; resetPaymentMethod?: boolean };
}
export type TCartAction =
	| ICartAddItemAction
	| ICartRemoveItemAction
	| ICartSaveShippingAddressAction
	| ICartSavePaymentMethodAction
	| ICreateCartItemsRequestAction
	| ICreateCartItemsRequestSuccessAction
	| ICreateCartItemsRequestFailAction
	| ICartResetAction;

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

interface IResetCartExtraOptions {
	resetShippingAddress?: boolean;
	resetPaymentMethod?: boolean;
}
export type IResetCart = (
	extraOptions?: IResetCartExtraOptions
) => (dispatch: TCartDispatch) => void;

/* ************************ */
/***** ORDER CREATE *****/
/* ************************ */

export interface IStoreOrderCreateState {
	data?: IOrder;
	isLoading: boolean;
	error: string;
	success: boolean;
}

interface IOrderCreateRequestAction {
	type: typeof ORDER_CREATE_CART_ITEMS_REQUEST_PENDING;
}
interface IOrderCreateRequestSuccessAction {
	type: typeof ORDER_CREATE_CART_ITEMS_REQUEST_SUCCESS;
	payload: { data: IOrder };
}
interface IOrderCreateRequestFailAction {
	type: typeof ORDER_CREATE_CART_ITEMS_REQUEST_FAIL;
	payload: { error: IStoreOrderCreateState['error'] };
}
export type TOrderCreateAction =
	| IOrderCreateRequestAction
	| IOrderCreateRequestSuccessAction
	| IOrderCreateRequestFailAction;

export type TStoreOrderCreateCartItemsReducer = Reducer<
	IStoreOrderCreateState,
	TOrderCreateAction
>;

type TOrderCreateDispatch =
	| React.Dispatch<TOrderCreateAction>
	| ((value: TOrderCreateAction) => IStoreOrderCreateState);
export type ICreateOrder = (data: {
	items: IOrder['items'];
	shippingAddress: IOrder['shippingAddress'];
	paymentMethod: IOrder['paymentMethod'];
	itemsPrice: IOrder['itemsPrice'];
	shippingPrice: IOrder['shippingPrice'];
	taxPrice: IOrder['taxPrice'];
	totalPrice: IOrder['totalPrice'];
}) => (dispatch: TOrderCreateDispatch, getState: () => TRootState) => void;

/* ************************ */
/***** ORDER DETAILS *****/
/* ************************ */

export interface IStoreOrderDetailsState {
	data?: IOrder;
	// shippingAddress
	isLoading: boolean;
	error: string;
}

interface IOrderDetailsRequestAction {
	type: typeof ORDER_DETAILS_REQUEST_PENDING;
}
interface IOrderDetailsRequestSuccessAction {
	type: typeof ORDER_DETAILS_REQUEST_SUCCESS;
	payload: { data: IOrder };
}
interface IOrderDetailsRequestFailAction {
	type: typeof ORDER_DETAILS_REQUEST_FAIL;
	payload: { error: IStoreOrderDetailsState['error'] };
}
interface IOrderDetailsResetAction {
	type: typeof ORDER_DETAILS_RESET;
}

export type TOrderDetailsAction =
	| IOrderDetailsRequestAction
	| IOrderDetailsRequestSuccessAction
	| IOrderDetailsRequestFailAction
	| IOrderDetailsResetAction;

export type TOrderDetailsReducer = Reducer<
	IStoreOrderDetailsState,
	TOrderDetailsAction
>;

type TOrderDetailsDispatch =
	| React.Dispatch<TOrderDetailsAction>
	| ((value: TOrderDetailsAction) => IStoreOrderDetailsState);
export type TGetOrderDetails = (
	_id: IUser['_id']
) => (dispatch: TOrderDetailsDispatch, getState: () => TRootState) => void;
export type TOrderDetailsReset = () => (
	dispatch: TOrderDetailsDispatch
) => void;

/* ************************ */
/***** ORDER DETAILS *****/
/* ************************ */
export interface IStoreOrderPayState {
	data?: IOrderPay;
	// shippingAddress
	isLoading: boolean;
	error: string;
	success: boolean;
}

interface IOrderPayActionRequestAction {
	type: typeof ORDER_PAY_REQUEST_PENDING;
}
interface IOrderPayActionRequestSuccessAction {
	type: typeof ORDER_PAY_REQUEST_SUCCESS;
	payload: { data: IOrderPay };
}
interface IOrderPayActionRequestFailAction {
	type: typeof ORDER_PAY_REQUEST_FAIL;
	payload: { error: IStoreOrderPayState['error'] };
}
interface IOrderPayResetAction {
	type: typeof ORDER_PAY_RESET;
}
export type TOrderPayAction =
	| IOrderPayActionRequestAction
	| IOrderPayActionRequestSuccessAction
	| IOrderPayActionRequestFailAction
	| IOrderPayResetAction;

export type TOrderPayReducer = Reducer<IStoreOrderPayState, TOrderPayAction>;

type TOrderPayDispatch =
	| React.Dispatch<TOrderPayAction>
	| ((value: TOrderPayAction) => IStoreOrderPayState);
export type TPayOrderAfterPayment = (
	orderId: string,
	paymentResults: {
		id: string;
		status: string;
		time: string;
		payer: { email_address: string };
	}
) => (dispatch: TOrderPayDispatch, getState: () => TRootState) => void;
export type TPayOrderReset = () => (dispatch: TOrderPayDispatch) => void;

/* ************************ */
/***** ORDERS LIST *****/
/* ************************ */
export interface IStoreOrdersListState {
	data: IOrder[];
	isLoading: boolean;
	error: string;
}

interface IOrdersListActionRequestAction {
	type: typeof ORDERS_LIST_REQUEST_PENDING;
}
interface IOrdersListActionRequestSuccessAction {
	type: typeof ORDERS_LIST_REQUEST_SUCCESS;
	payload: { data: IOrder[] };
}
interface IOrdersListActionRequestFailAction {
	type: typeof ORDERS_LIST_REQUEST_FAIL;
	payload: { error: IStoreOrdersListState['error'] };
}
interface IOrdersListActionResetAction {
	type: typeof ORDERS_LIST_RESET;
}
export type TOrdersListAction =
	| IOrdersListActionRequestAction
	| IOrdersListActionRequestSuccessAction
	| IOrdersListActionRequestFailAction
	| IOrdersListActionResetAction;

export type TOrdersListReducer = Reducer<
	IStoreOrdersListState,
	TOrdersListAction
>;

type TOrdersListDispatch =
	| React.Dispatch<TOrdersListAction>
	| ((value: TOrdersListAction) => IStoreOrdersListState);
export type TGetOrdersList = () => (
	dispatch: TOrdersListDispatch,
	getState: () => TRootState
) => void;
export type TOrdersListReset = () => (dispatch: TOrdersListDispatch) => void;

/* ************************ */
/******* STORE STATE *******/
/* ************************ */
export interface IStoreState {
	user: IStoreUserState;
	admin: TStoreAdminState;
	productList: IStoreProductsListState;
	productDetails: IStoreProductDetailsState;
	cart: IStoreCartState;
	orderCreate: IStoreOrderCreateState;
	orderDetails: IStoreOrderDetailsState;
	orderPay: IStoreOrderPayState;
	ordersList: IStoreOrdersListState;
}

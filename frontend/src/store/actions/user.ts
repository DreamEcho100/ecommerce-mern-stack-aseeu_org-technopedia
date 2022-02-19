import ls from 'src/lib/utils/storage/localStorage';
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
	ADMIN_USERS_LIST_REQUEST_PENDING,
	ADMIN_USERS_LIST_REQUEST_SUCCESS,
	ADMIN_USERS_LIST_REQUEST_FAIL,
	ADMIN_USERS_LIST_REQUEST_RESET,
	ADMIN_DELETE_USER_REQUEST_PENDING,
	ADMIN_DELETE_USER_REQUEST_SUCCESS,
	ADMIN_DELETE_USER_REQUEST_FAIL,
	IS_USER_ADMIN,
	ADMIN_GET_SELECTED_USER_REQUEST_PENDING,
	ADMIN_GET_SELECTED_USER_REQUEST_SUCCESS,
	ADMIN_GET_SELECTED_USER_REQUEST_FAIL,
	ADMIN_UPDATE_SELECTED_USER_REQUEST_PENDING,
	ADMIN_UPDATE_SELECTED_USER_REQUEST_SUCCESS,
	ADMIN_UPDATE_SELECTED_USER_REQUEST_FAIL,
	ADMIN_DELETE_PRODUCT_REQUEST_PENDING,
	ADMIN_DELETE_PRODUCT_REQUEST_SUCCESS,
	ADMIN_DELETE_PRODUCT_REQUEST_FAIL,
	ADMIN_DELETE_PRODUCT_REQUEST_RESET,
	ADMIN_CREATE_PRODUCT_REQUEST_PENDING,
	ADMIN_CREATE_PRODUCT_REQUEST_SUCCESS,
	ADMIN_CREATE_PRODUCT_REQUEST_FAIL,
	ADMIN_CREATE_PRODUCT_REQUEST_RESET,
	ADMIN_UPDATE_PRODUCT_REQUEST_PENDING,
	ADMIN_UPDATE_PRODUCT_REQUEST_SUCCESS,
	ADMIN_UPDATE_PRODUCT_REQUEST_FAIL,
	ADMIN_UPDATE_PRODUCT_REQUEST_RESET,
	ADMIN_UPDATE_SELECTED_USER_REQUEST_RESET,
	ADMIN_GET_ORDERS_LIST_REQUEST_PENDING,
	ADMIN_GET_ORDERS_LIST_REQUEST_SUCCESS,
	ADMIN_GET_ORDERS_LIST_REQUEST_FAIL,
	ADMIN_ORDER_DELIVERY_REQUEST_PENDING,
	ADMIN_ORDER_DELIVERY_REQUEST_SUCCESS,
	ADMIN_ORDER_DELIVERY_REQUEST_FAIL,
	ADMIN_ORDER_DELIVERY_REQUEST_RESET,
} from 'src/lib/core/constants';
import { IOrder, IProduct, IUser } from 'src/react-app-env';
import {
	THandleUserLogin,
	THandleUserLogout,
	THandleUserRegister,
	TGetUserDetails,
	TUpdateUserProfile,
	TIsUserAdmin,
	TAdminReset,
	TAdminGetUsersList,
	TAdminDeleteUser,
	TAdminGetSelectedUserInfo,
	TAdminUpdateSelectedUserInfo,
	TAdminDeleteProduct,
	TAdminCreateProduct,
	TAdminDeleteProductRequestReset,
	TAdminCreateProductRequestReset,
	TAdminUpdateProduct,
	TAdminUpdateProductRequestReset,
	TAdminUpdateSelectedUserInfoRequestReset,
	TAdminGetUsersListReset,
	TAdminGetOrdersList,
	TAdminOrderDeliveredRequest,
	TAdminOrderDeliveredRequestReset,
} from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';
import { handleActionThrowError } from 'src/lib/core/error';

export const handleUserLogin: THandleUserLogin =
	(email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST_PENDING });

			const userInfo: IUser = await fetch(
				`${BACK_END_ROOT_URL}/api/users/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				}
			).then((response) => response.json());

			if (typeof userInfo !== 'object' || !userInfo || !userInfo._id)
				handleActionThrowError<typeof userInfo>(userInfo);

			ls.set('userInfo', userInfo);

			dispatch({
				type: USER_LOGIN_REQUEST_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_LOGIN_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const handleUserRegister: THandleUserRegister =
	(name, email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST_PENDING });

			const userInfo: IUser = await fetch(`${BACK_END_ROOT_URL}/api/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			}).then((response) => response.json());

			if (typeof userInfo !== 'object' || !userInfo || !userInfo._id)
				handleActionThrowError<typeof userInfo>(userInfo);

			ls.set('userInfo', userInfo);

			dispatch({
				type: USER_REGISTER_REQUEST_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_REGISTER_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const handleUserLogout: THandleUserLogout = () => (dispatch) => {
	ls.remove('userInfo');

	setTimeout(() => dispatch({ type: USER_LOGOUT }), 0);
};

export const getUserDetails: TGetUserDetails =
	(_id) => async (dispatch, getState) => {
		try {
			dispatch({ type: USER_DETAILS_REQUEST_PENDING });

			const {
				user: { info },
			} = getState();

			if (!info || !info._id) throw new Error('User info not found!');

			const userInfo: IUser = await fetch(
				`${BACK_END_ROOT_URL}/api/users/${_id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${info.token}`,
					},
				}
			).then((response) => response.json());

			if (typeof userInfo !== 'object' || !userInfo || !userInfo._id)
				handleActionThrowError<typeof userInfo>(userInfo);

			ls.set('userInfo', {
				...info,
				...userInfo,
			});

			dispatch({
				type: USER_DETAILS_REQUEST_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_DETAILS_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const updateUserProfile: TUpdateUserProfile =
	(userUpdatedInfo) =>
	// _id
	async (dispatch, getState) => {
		try {
			if (typeof userUpdatedInfo !== 'object')
				throw new Error('No data provided!');

			let itemExist: boolean = false;
			let item: keyof typeof userUpdatedInfo;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (item in userUpdatedInfo) {
				itemExist = true;
				break;
			}

			if (!itemExist) throw new Error('No data provided!');

			dispatch({ type: USER_UPDATE_PROFILE_REQUEST_PENDING });

			const {
				user: { info },
			} = getState();

			if (!info || !info._id) throw new Error('User info not found!');

			const userInfo: IUser = await fetch(
				`${BACK_END_ROOT_URL}/api/users/profile`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${info.token}`,
					},
					body: JSON.stringify(userUpdatedInfo),
				}
			).then((response) => response.json());

			// delete userUpdatedInfo.password;

			if (typeof userInfo !== 'object' || !userInfo || !userInfo._id)
				handleActionThrowError<typeof userInfo>(userInfo);

			ls.set('userInfo', {
				...info,
				...userInfo,
			});

			dispatch({
				type: USER_UPDATE_PROFILE_REQUEST_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_UPDATE_PROFILE_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const adminGetUsersList: TAdminGetUsersList =
	() => async (dispatch, getState) => {
		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_USERS_LIST_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const usersList: IUser[] = await fetch(`${BACK_END_ROOT_URL}/api/users`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${info.token}`,
				},
			}).then((response) => response.json());

			// delete userUpdatedInfo.password;

			if (!Array.isArray(usersList) || !usersList)
				handleActionThrowError<typeof usersList>(usersList);

			dispatch({
				type: ADMIN_USERS_LIST_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin, usersList },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_USERS_LIST_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const adminGetUsersListReset: TAdminGetUsersListReset =
	() => (dispatch) => {
		dispatch({
			type: ADMIN_USERS_LIST_REQUEST_RESET,
		});
	};

export const adminDeleteUser: TAdminDeleteUser =
	(_id) => async (dispatch, getState) => {
		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_DELETE_USER_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const result: {
				succuss: boolean;
			} = await fetch(`${BACK_END_ROOT_URL}/api/users/${_id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${info.token}`,
				},
			}).then((response) => response.json());

			// delete userUpdatedInfo.password;

			if (!result || !result.succuss)
				handleActionThrowError<typeof result>(result);

			dispatch({
				type: ADMIN_DELETE_USER_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin, _id },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_DELETE_USER_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const adminGetSelectedUserInfo: TAdminGetSelectedUserInfo =
	(_id) => async (dispatch, getState) => {
		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_GET_SELECTED_USER_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const selectedUser: IUser = await fetch(
				`${BACK_END_ROOT_URL}/api/users/${_id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${info.token}`,
					},
				}
			).then((response) => response.json());

			if (!selectedUser || !selectedUser._id)
				handleActionThrowError<typeof selectedUser>(selectedUser);

			dispatch({
				type: ADMIN_GET_SELECTED_USER_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin, selectedUser },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_GET_SELECTED_USER_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const adminUpdateSelectedUserInfo: TAdminUpdateSelectedUserInfo =
	(_id, updatedData) => async (dispatch, getState) => {
		try {
			if (typeof updatedData !== 'object') throw new Error('No data provided!');

			let itemExist: boolean = false;
			let item: keyof typeof updatedData;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (item in updatedData) {
				itemExist = true;
				break;
			}

			if (!itemExist) throw new Error('No data provided!');

			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_UPDATE_SELECTED_USER_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const updatedSelectedUser: IUser = await fetch(
				`${BACK_END_ROOT_URL}/api/users/${_id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${info.token}`,
					},
					body: JSON.stringify(updatedData),
				}
			).then((response) => response.json());

			if (!updatedSelectedUser || !updatedSelectedUser._id)
				handleActionThrowError<typeof updatedSelectedUser>(updatedSelectedUser);

			dispatch({
				type: ADMIN_UPDATE_SELECTED_USER_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin, updatedData },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_UPDATE_SELECTED_USER_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const adminUpdateSelectedUserInfoRequestReset: TAdminUpdateSelectedUserInfoRequestReset =
	() => (dispatch) => {
		dispatch({
			type: ADMIN_UPDATE_SELECTED_USER_REQUEST_RESET,
		});
	};

export const adminDeleteProduct: TAdminDeleteProduct =
	(_id) => async (dispatch, getState) => {
		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_DELETE_PRODUCT_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const deleteProduct: { success: boolean } = await fetch(
				`${BACK_END_ROOT_URL}/api/products/${_id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${info.token}`,
					},
				}
			).then((response) => response.json());

			if (!deleteProduct || !deleteProduct.success)
				handleActionThrowError<typeof deleteProduct>(deleteProduct);

			dispatch({
				type: ADMIN_DELETE_PRODUCT_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin },
			});

			return _id;
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_DELETE_PRODUCT_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};
export const adminDeleteProductRequestReset: TAdminDeleteProductRequestReset =
	() => (dispatch) => {
		dispatch({
			type: ADMIN_DELETE_PRODUCT_REQUEST_RESET,
		});
	};

export const adminCreateProduct: TAdminCreateProduct =
	(newProductData) => async (dispatch, getState) => {
		try {
			if (typeof newProductData !== 'object')
				throw new Error('No data provided!');

			let itemExist: boolean = false;
			let item: keyof typeof newProductData;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (item in newProductData) {
				itemExist = true;
				break;
			}

			if (!itemExist) throw new Error('No data provided!');

			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_CREATE_PRODUCT_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const newProduct: IProduct = await fetch(
				`${BACK_END_ROOT_URL}/api/products`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${info.token}`,
					},
					body: JSON.stringify(newProductData),
				}
			).then((response) => response.json());

			if (!newProduct || !newProduct._id)
				handleActionThrowError<typeof newProduct>(newProduct);

			dispatch({
				type: ADMIN_CREATE_PRODUCT_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin },
			});

			return newProduct;
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_CREATE_PRODUCT_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};
export const adminCreateProductRequestReset: TAdminCreateProductRequestReset =
	() => (dispatch) => {
		dispatch({
			type: ADMIN_CREATE_PRODUCT_REQUEST_RESET,
		});
	};

export const adminUpdateProduct: TAdminUpdateProduct =
	(_id, newProductDataToUpdate) => async (dispatch, getState) => {
		if (typeof newProductDataToUpdate !== 'object')
			throw new Error('No data provided!');

		let itemExist: boolean = false;
		let item: keyof typeof newProductDataToUpdate;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (item in newProductDataToUpdate) {
			itemExist = true;
			break;
		}

		if (!itemExist) throw new Error('No data provided!');

		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_UPDATE_PRODUCT_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const updatedProduct: IProduct = await fetch(
				`${BACK_END_ROOT_URL}/api/products/${_id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${info.token}`,
					},
					body: JSON.stringify(newProductDataToUpdate),
				}
			).then((response) => response.json());

			if (!updatedProduct || !updatedProduct._id)
				handleActionThrowError<typeof updatedProduct>(updatedProduct);

			dispatch({
				type: ADMIN_UPDATE_PRODUCT_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin },
			});

			return _id;
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_UPDATE_PRODUCT_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};
export const adminUpdateProductRequestReset: TAdminUpdateProductRequestReset =
	() => (dispatch) => {
		dispatch({
			type: ADMIN_UPDATE_PRODUCT_REQUEST_RESET,
		});
	};

export const adminGetOrdersList: TAdminGetOrdersList =
	() => async (dispatch, getState) => {
		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_GET_ORDERS_LIST_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const ordersList: IOrder[] = await fetch(
				`${BACK_END_ROOT_URL}/api/orders`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${info.token}`,
					},
				}
			).then((response) => response.json());

			// delete userUpdatedInfo.password;

			if (!Array.isArray(ordersList) || !ordersList)
				handleActionThrowError<typeof ordersList>(ordersList);

			dispatch({
				type: ADMIN_GET_ORDERS_LIST_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin, ordersList },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_GET_ORDERS_LIST_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const adminOrderDeliveredRequest: TAdminOrderDeliveredRequest =
	(_id) => async (dispatch, getState) => {
		try {
			const {
				user: { info },
			} = getState();

			dispatch({
				type: ADMIN_ORDER_DELIVERY_REQUEST_PENDING,
				payload: { isAdmin: !!info?.isAdmin },
			});

			if (!info || !info._id) throw new Error('User info not found!');

			const ordersList: IOrder = await fetch(
				`${BACK_END_ROOT_URL}/api/orders/${_id}/delivery`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${info.token}`,
					},
				}
			).then((response) => response.json());

			// delete userUpdatedInfo.password;

			if (!ordersList || !ordersList._id)
				handleActionThrowError<typeof ordersList>(ordersList);

			dispatch({
				type: ADMIN_ORDER_DELIVERY_REQUEST_SUCCESS,
				payload: { isAdmin: !!info?.isAdmin, _id },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: ADMIN_ORDER_DELIVERY_REQUEST_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};
export const adminOrderDeliveredRequestReset: TAdminOrderDeliveredRequestReset =
	() => (dispatch) => {
		dispatch({
			type: ADMIN_ORDER_DELIVERY_REQUEST_RESET,
		});
	};

export const isUserAdmin: TIsUserAdmin = (isAdmin) => (dispatch) => {
	dispatch({
		type: IS_USER_ADMIN,
		payload: { isAdmin },
	});
};
export const adminReset: TAdminReset = () => (dispatch) => {
	dispatch({
		type: IS_USER_ADMIN,
		payload: { isAdmin: false },
	});
};

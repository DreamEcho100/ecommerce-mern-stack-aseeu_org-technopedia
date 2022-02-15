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
	// USER_IS_NOT_ADMIN,
	ADMIN_USERS_LIST_REQUEST_PENDING,
	ADMIN_USERS_LIST_REQUEST_SUCCESS,
	ADMIN_USERS_LIST_REQUEST_FAIL,
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
} from 'src/lib/core/constants';
import { IUser } from 'src/react-app-env';
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
				message: string;
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

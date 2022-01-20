import ls from 'src/utils/v1/localStorage';
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
} from 'src/constants';
import { IUser } from 'src/react-app-env';
import {
	THandleUserLogin,
	THandleUserLogout,
	THandleUserRegister,
	TGetUserDetails,
	TUpdateUserProfile,
} from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';

export const handleUserLogin: THandleUserLogin =
	(email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });

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
				throw new Error(
					typeof userInfo === 'string' ? userInfo : JSON.stringify(userInfo)
				);

			ls.set('userInfo', userInfo);

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_LOGIN_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const handleUserRegister: THandleUserRegister =
	(name, email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const userInfo: IUser = await fetch(`${BACK_END_ROOT_URL}/api/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			}).then((response) => response.json());

			if (typeof userInfo !== 'object' || !userInfo || !userInfo._id)
				throw new Error(
					typeof userInfo === 'string' ? userInfo : JSON.stringify(userInfo)
				);

			ls.set('userInfo', userInfo);

			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_REGISTER_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

export const handleUserLogout: THandleUserLogout = () => (dispatch) => {
	ls.remove('userInfo');

	console.log('USER_LOGOUT', USER_LOGOUT);
	dispatch({ type: USER_LOGOUT });
};

export const getUserDetails: TGetUserDetails =
	(_id) => async (dispatch, getState) => {
		try {
			dispatch({ type: USER_DETAILS_REQUEST });

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
				throw new Error(
					typeof userInfo === 'string' ? userInfo : JSON.stringify(userInfo)
				);

			ls.set('userInfo', {
				...info,
				...userInfo,
			});

			dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_DETAILS_FAIL,
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
			dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

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
				throw new Error(
					typeof userInfo === 'string' ? userInfo : JSON.stringify(userInfo)
				);

			ls.set('userInfo', {
				...info,
				...userInfo,
			});

			dispatch({
				type: USER_UPDATE_PROFILE_SUCCESS,
				payload: { info: userInfo },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: USER_UPDATE_PROFILE_FAIL,
					payload: { error: error.message },
				});
				console.error(error.message);
			}
		}
	};

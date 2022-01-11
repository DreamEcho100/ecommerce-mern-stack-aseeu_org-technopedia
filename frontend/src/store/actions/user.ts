import ls from 'src/utils/v1/localStorage';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
} from 'src/constants';
import { IUser } from 'src/react-app-env';
import {
	THandleUserLogin,
	THandleUserLogout,
	THandleUserRegister,
} from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';

export const handleUserLogin: THandleUserLogin =
	(email, password) => async (dispatch, getState) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });

			const userInfo: IUser = await fetch(`${BACK_END_ROOT_URL}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}).then((response) => response.json());

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
	(name, email, password) => async (dispatch, getState) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const userInfo: IUser = await fetch(`${BACK_END_ROOT_URL}/users`, {
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

export const handleUserLogout: THandleUserLogout =
	() => (dispatch, getState) => {
		ls.remove('userInfo');

		console.log('USER_LOGOUT', USER_LOGOUT);
		dispatch({ type: USER_LOGOUT });
	};

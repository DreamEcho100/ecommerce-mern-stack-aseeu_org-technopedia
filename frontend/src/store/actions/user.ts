import ls from 'src/utils/v1/localStorage';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from 'src/constants';
import { TUser } from 'src/react-app-env';
import { TUserDispatch } from 'src/store/ts';
import { BACK_END_ROOT_URL } from 'src/config';
import { RootState } from 'src/store';

export const handleUserLogin =
	(email: string, password: string) =>
	async (dispatch: TUserDispatch, getState: () => RootState) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });

			const userInfo: TUser = await fetch(`${BACK_END_ROOT_URL}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}).then((response) => response.json());

			if (
				typeof userInfo !== 'object' ||
				!userInfo ||
				!userInfo._id
			) throw new Error(
				typeof userInfo === 'string' ? userInfo :	JSON.stringify(userInfo)
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

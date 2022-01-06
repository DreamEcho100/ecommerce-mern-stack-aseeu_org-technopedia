import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from 'src/constants';
import { T_USER_REDUCER } from 'src/store/ts/types';
import { userInitialState } from 'src/store/initialState';

const userReducer: T_USER_REDUCER = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loading: true,
			};
		}

		case USER_LOGIN_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				loading: false,
				info,
			};
		}

		case USER_LOGIN_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				loading: false,
				error,
			};
		}

		case USER_LOGOUT: {
			return userInitialState;
		}

		default:
			return state;
	}
};

export default userReducer;

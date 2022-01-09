import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from 'src/constants';
import { TUserReducer } from 'src/store/ts';
import { userInitialState } from 'src/store/initialState';

const userReducer: TUserReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loading: true,
				error: ''
			};
		}

		case USER_LOGIN_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				loading: false,
				error: '',
				info,
			};
		}

		case USER_LOGIN_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				loading: false,
				info: userInitialState.info,
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

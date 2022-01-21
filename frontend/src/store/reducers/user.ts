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
	USER_UPDATE_PROFILE_RESET,
} from 'src/lib/core/constants';
import { IUserReducer } from 'src/store/ts';
import { returnUserInitialState } from 'src/store/initialState';

const userInit = returnUserInitialState;

const userReducer: IUserReducer = (state = userInit(), action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
		case USER_LOGIN_REQUEST: {
			return {
				...userInit(),
				isLoading: true,
			};
		}

		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS: {
			const { info } = action.payload;

			return {
				...userInit(),
				info,
			};
		}

		case USER_REGISTER_FAIL:
		case USER_LOGIN_FAIL: {
			const { error } = action.payload;

			return {
				// ...state,
				// isLoading: false,
				// info: userInit().info,
				...userInit(),
				error,
			};
		}

		case USER_LOGOUT: {
			return userInit();
		}

		case USER_DETAILS_REQUEST: {
			return {
				...state,
				actions: {
					...state.actions,
					requestUserDetails: {
						...userInit().actions.requestUserDetails,
						isLoading: true,
					},
				},
			};
		}
		case USER_DETAILS_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				info: {
					...state.info,
					...info,
				},
				actions: {
					...state.actions,
					requestUserDetails: {
						...userInit().actions.requestUserDetails,
						success: true,
					},
				},
			};
		}
		case USER_DETAILS_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requestUserDetails: {
						...userInit().actions.requestUserDetails,
						error,
					},
				},
			};
		}

		case USER_UPDATE_PROFILE_REQUEST: {
			return {
				...state,
				actions: {
					...state.actions,
					requestUpdateUserProfile: {
						...userInit().actions.requestUpdateUserProfile,
						isLoading: true,
					},
				},
			};
		}
		case USER_UPDATE_PROFILE_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				info: {
					...state.info,
					...info,
				},
				actions: {
					...state.actions,
					requestUpdateUserProfile: {
						...userInit().actions.requestUpdateUserProfile,
						success: true,
					},
				},
			};
		}
		case USER_UPDATE_PROFILE_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requestUpdateUserProfile: {
						...userInit().actions.requestUpdateUserProfile,
						error,
					},
				},
			};
		}
		case USER_UPDATE_PROFILE_RESET: {
			return state;
		}

		default: {
			return state;
		}
	}
};

export default userReducer;

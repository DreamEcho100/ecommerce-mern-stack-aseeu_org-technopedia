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
} from 'src/constants';
import { IUserReducer } from 'src/store/ts';
import { returnUserInitialState } from 'src/store/initialState';

const userReducer: IUserReducer = (
	state = returnUserInitialState(),
	action
) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loading: true,
				error: '',
			};
		}

		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				loading: false,
				error: '',
				info,
			};
		}

		case USER_REGISTER_FAIL:
		case USER_LOGIN_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				loading: false,
				info: returnUserInitialState().info,
				error,
			};
		}

		case USER_LOGOUT: {
			return returnUserInitialState();
		}

		case USER_DETAILS_REQUEST: {
			return {
				...state,
				actions: {
					...state.actions,
					requestUserDetails: {
						...state.actions.requestUserDetails,
						error: '',
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
						error: '',
						isLoading: false,
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
						...state.actions.requestUserDetails,
						error,
						isLoading: false,
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
						...state.actions.requestUpdateUserProfile,
						error: '',
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
						error: '',
						isLoading: false,
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
						...state.actions.requestUpdateUserProfile,
						error,
						isLoading: false,
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

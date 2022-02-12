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
	USER_IS_NOT_ADMIN,
	ADMIN_DELETE_USER_REQUEST_PENDING,
	ADMIN_DELETE_USER_REQUEST_FAIL,
	ADMIN_DELETE_USER_REQUEST_SUCCESS,
} from 'src/lib/core/constants';
import { IAdminReducer, TStoreAdminState, IUserReducer } from 'src/store/ts';
import {
	returnUserInitialState as userInit,
	returnAdminInitialState as adminInit,
} from 'src/store/initialState';
import { IAdmin } from 'src/react-app-env';
export const userReducer: IUserReducer = (state = userInit(), action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST_PENDING:
		case USER_LOGIN_REQUEST_PENDING: {
			return {
				...userInit(),
				isLoading: true,
			};
		}

		case USER_REGISTER_REQUEST_SUCCESS:
		case USER_LOGIN_REQUEST_SUCCESS: {
			const { info } = action.payload;

			return {
				...userInit(),
				info,
			};
		}

		case USER_REGISTER_REQUEST_FAIL:
		case USER_LOGIN_REQUEST_FAIL: {
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

		case USER_DETAILS_REQUEST_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						userDetails: {
							...userInit().actions.requests.userDetails,
							isLoading: true,
						},
					},
				},
			};
		}
		case USER_DETAILS_REQUEST_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				info: {
					...state.info,
					...info,
				},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						userDetails: {
							...userInit().actions.requests.userDetails,
							success: true,
						},
					},
				},
			};
		}
		case USER_DETAILS_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						userDetails: {
							...userInit().actions.requests.userDetails,
							error,
						},
					},
				},
			};
		}

		case USER_UPDATE_PROFILE_REQUEST_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						updateUserProfile: {
							...userInit().actions.requests.updateUserProfile,
							isLoading: true,
						},
					},
				},
			};
		}
		case USER_UPDATE_PROFILE_REQUEST_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				info: {
					...state.info,
					...info,
				},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						updateUserProfile: {
							...userInit().actions.requests.updateUserProfile,
							success: true,
						},
					},
				},
			};
		}
		case USER_UPDATE_PROFILE_REQUEST_FAIL: {
			const { error } = action.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						updateUserProfile: {
							...userInit().actions.requests.updateUserProfile,
							error,
						},
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

const adminCurrentState = (isAdmin: boolean, state: TStoreAdminState) =>
	state || (adminInit(isAdmin) as IAdmin);

export const adminReducer: IAdminReducer = (state = adminInit(), action) => {
	switch (action.type) {
		case ADMIN_USERS_LIST_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentAdminInit.actions.requests,
						usersList: {
							...currentAdminInit.actions.requests.usersList,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_USERS_LIST_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			const { usersList } = action.payload;

			return {
				...currentState,
				usersList,
				actions: {
					...currentState.actions,
					requests: {
						...currentAdminInit.actions.requests,
						usersList: {
							...currentAdminInit.actions.requests.usersList,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_USERS_LIST_REQUEST_FAIL: {
			// if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			const { error } = action.payload;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentAdminInit.actions.requests,
						usersList: {
							...currentAdminInit.actions.requests.usersList,
							isLoading: false,
							error,
						},
					},
				},
			};
		}

		case ADMIN_DELETE_USER_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentAdminInit.actions.requests,
						deleteUser: {
							...currentAdminInit.actions.requests.deleteUser,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_DELETE_USER_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			const { _id } = action.payload;

			return {
				...currentState,
				usersList: currentState.usersList.filter((user) => user._id !== _id),
				actions: {
					...currentState.actions,
					requests: {
						...currentAdminInit.actions.requests,
						usersList: {
							...currentAdminInit.actions.requests.usersList,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_DELETE_USER_REQUEST_FAIL: {
			// if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			const { error } = action.payload;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentAdminInit.actions.requests,
						deleteUser: {
							...currentAdminInit.actions.requests.deleteUser,
							isLoading: false,
							error,
						},
					},
				},
			};
		}

		case ADMIN_USERS_LIST_RESET: {
			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				usersList: currentAdminInit.usersList,
				actions: {
					requests: {
						...currentAdminInit.actions.requests,
						usersList: currentAdminInit.actions.requests.usersList,
					},
				},
			};
		}

		case USER_IS_NOT_ADMIN: {
			return null;
		}

		default: {
			return state;
		}
	}
};

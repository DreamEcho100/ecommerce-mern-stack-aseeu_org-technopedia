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
	IS_USER_ADMIN,
	ADMIN_USERS_LIST_REQUEST_PENDING,
	ADMIN_USERS_LIST_REQUEST_SUCCESS,
	ADMIN_USERS_LIST_REQUEST_FAIL,
	// ADMIN_USERS_LIST_RESET,
	USER_IS_NOT_ADMIN,
	ADMIN_DELETE_USER_REQUEST_PENDING,
	ADMIN_DELETE_USER_REQUEST_FAIL,
	ADMIN_DELETE_USER_REQUEST_SUCCESS,
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
} from 'src/lib/core/constants';
import { IAdminReducer, TStoreAdminState, IUserReducer } from 'src/store/ts';
import {
	returnUserInitialState as userInit,
	returnAdminInitialState as adminInit,
	handleReturningUserReducerInitialState,
} from 'src/store/initialState';
import { IAdmin, IBasicUser } from 'src/react-app-env';

export const userReducer: IUserReducer = (
	state = handleReturningUserReducerInitialState(),
	action
) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST_PENDING:
		case USER_LOGIN_REQUEST_PENDING: {
			return {
				...state,
				isLoading: true,
				error: '',
			};
		}

		case USER_REGISTER_REQUEST_SUCCESS:
		case USER_LOGIN_REQUEST_SUCCESS: {
			const { info } = action.payload;

			return {
				...state,
				isLoading: true,
				error: '',
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
				// ...userInit(),
				...state,
				info: undefined,
				isLoading: false,
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
		case IS_USER_ADMIN: {
			return adminInit(action.payload.isAdmin);
		}

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
						...currentState.actions.requests,
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
						...currentState.actions.requests,
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
						...currentState.actions.requests,
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
						...currentState.actions.requests,
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
						...currentState.actions.requests,
						deleteUser: {
							...currentAdminInit.actions.requests.deleteUser,
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
						...currentState.actions.requests,
						deleteUser: {
							...currentAdminInit.actions.requests.deleteUser,
							isLoading: false,
							error,
						},
					},
				},
			};
		}

		case ADMIN_GET_SELECTED_USER_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						getSelectedUser: {
							...currentAdminInit.actions.requests.getSelectedUser,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_GET_SELECTED_USER_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			const { selectedUser } = action.payload;

			return {
				...currentState,
				selectedUser,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						getSelectedUser: {
							...currentAdminInit.actions.requests.getSelectedUser,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_GET_SELECTED_USER_REQUEST_FAIL: {
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
						...currentState.actions.requests,
						getSelectedUser: {
							...currentAdminInit.actions.requests.getSelectedUser,
							isLoading: false,
							error,
						},
					},
				},
			};
		}

		case ADMIN_UPDATE_SELECTED_USER_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						updateSelectedUser: {
							...currentAdminInit.actions.requests.updateSelectedUser,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_UPDATE_SELECTED_USER_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			const { updatedData } = action.payload;

			return {
				...currentState,
				selectedUser: {
					...(currentState.selectedUser || {}),
					...updatedData,
				} as IBasicUser,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						getSelectedUser: {
							...currentAdminInit.actions.requests.getSelectedUser,
							isLoading: false,
						},
						updateSelectedUser: {
							...currentAdminInit.actions.requests.updateSelectedUser,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_UPDATE_SELECTED_USER_REQUEST_FAIL: {
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
						...currentState.actions.requests,
						updateSelectedUser: {
							...currentAdminInit.actions.requests.updateSelectedUser,
							isLoading: false,
							error,
						},
					},
				},
			};
		}

		case ADMIN_DELETE_PRODUCT_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						deleteProduct: {
							...currentAdminInit.actions.requests.deleteProduct,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_DELETE_PRODUCT_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						deleteProduct: {
							...currentAdminInit.actions.requests.deleteProduct,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_DELETE_PRODUCT_REQUEST_FAIL: {
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
						...currentState.actions.requests,
						deleteProduct: {
							...currentAdminInit.actions.requests.deleteProduct,
							isLoading: false,
							error,
						},
					},
				},
			};
		}
		case ADMIN_DELETE_PRODUCT_REQUEST_RESET: {
			// if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						deleteProduct: {
							...currentAdminInit.actions.requests.deleteProduct,
						},
					},
				},
			};
		}

		case ADMIN_CREATE_PRODUCT_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						createProduct: {
							...currentAdminInit.actions.requests.createProduct,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_CREATE_PRODUCT_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						createProduct: {
							...currentAdminInit.actions.requests.createProduct,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_CREATE_PRODUCT_REQUEST_FAIL: {
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
						...currentState.actions.requests,
						createProduct: {
							...currentAdminInit.actions.requests.createProduct,
							isLoading: false,
							error,
						},
					},
				},
			};
		}
		case ADMIN_CREATE_PRODUCT_REQUEST_RESET: {
			// if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						createProduct: {
							...currentAdminInit.actions.requests.createProduct,
						},
					},
				},
			};
		}

		case ADMIN_UPDATE_PRODUCT_REQUEST_PENDING: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						updateProduct: {
							...currentAdminInit.actions.requests.updateProduct,
							isLoading: true,
						},
					},
				},
			};
		}
		case ADMIN_UPDATE_PRODUCT_REQUEST_SUCCESS: {
			if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						updateProduct: {
							...currentAdminInit.actions.requests.updateProduct,
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case ADMIN_UPDATE_PRODUCT_REQUEST_FAIL: {
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
						...currentState.actions.requests,
						updateProduct: {
							...currentAdminInit.actions.requests.updateProduct,
							isLoading: false,
							error,
						},
					},
				},
			};
		}
		case ADMIN_UPDATE_PRODUCT_REQUEST_RESET: {
			// if (!action.payload.isAdmin) return state;

			const currentState = adminCurrentState(true, state);
			const currentAdminInit = adminInit(true);

			if (!currentAdminInit) return state;

			return {
				...currentState,
				actions: {
					...currentState.actions,
					requests: {
						...currentState.actions.requests,
						updateProduct: {
							...currentAdminInit.actions.requests.updateProduct,
						},
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

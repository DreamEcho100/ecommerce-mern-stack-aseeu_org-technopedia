import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createTrackedSelector } from 'react-tracked';
import { useSelector } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '@src/store/reducers';
import storeInitialState from './initialState';

const rootReducer = combineReducers(reducers);

export type TRootState = ReturnType<typeof rootReducer>;

const middleware: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') middleware.push(logger);

const store = createStore(
	rootReducer,
	storeInitialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export const useMainStoreSelector =
	createTrackedSelector<TRootState>(useSelector);

export default store;

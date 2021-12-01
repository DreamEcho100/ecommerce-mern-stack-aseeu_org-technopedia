import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createTrackedSelector } from 'react-tracked';
import { useSelector } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from 'src/store/reducers/productReducer';

const reducers = {
	productList: productListReducer,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

const initialState = {
	productList: {
		products: [],
		loading: false,
		error: '',
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export const useTrackedSelector = createTrackedSelector<RootState>(useSelector);

export default store;

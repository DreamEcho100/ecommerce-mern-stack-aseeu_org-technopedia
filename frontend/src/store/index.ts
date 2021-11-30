import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { Products } from 'src/react-app-env';
import { productListReducer } from 'src/reducers/productReducer';

const reducer = combineReducers(productListReducer);

export type InitialState = {
	products: Products;
	loading: boolean;
	error: string;
};

const initialState: InitialState = {
	products: [],
	loading: false,
	error: '',
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

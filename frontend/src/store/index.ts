import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createTrackedSelector } from 'react-tracked';
import { useSelector } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
// import productListReducer from 'src/store/reducers/productList';
// import productDetailsReducer from 'src/store/reducers/productDetails';
import reducers from 'src/store/reducers';
import { STORE_STATE } from './ts/types';

// const reducers = {
// 	productList: productListReducer,
// 	productDetails: productDetailsReducer,
// };

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

const initialState: STORE_STATE = {
	productList: {
		products: [],
		loading: false,
		error: '',
	},
	productDetails: { 
		product: {
			_id: '',
			name: '',
			image: '',
			description: '',
			brand: '',
			category: '',
			price: 0,
			countInStock: 0,
			rating: 0,
			numReviews: 0,
		},
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

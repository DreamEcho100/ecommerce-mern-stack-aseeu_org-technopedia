import user from './user';
import productDetails from './productDetails';
import productList from './productList';
import cart from './cart';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
} from './order';

const reducers = {
	user,
	productDetails,
	productList,
	cart,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
};

export default reducers;

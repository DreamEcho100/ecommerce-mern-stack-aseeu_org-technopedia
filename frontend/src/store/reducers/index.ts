import { userReducer as user, adminReducer as admin } from './user';
import productDetails from './productDetails';
import productList from './productList';
import cart from './cart';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	ordersListReducer,
} from './order';

const reducers = {
	user,
	admin,
	productDetails,
	productList,
	cart,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	ordersList: ordersListReducer,
};

export default reducers;

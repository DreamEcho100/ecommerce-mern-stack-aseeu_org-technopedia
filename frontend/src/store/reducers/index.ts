import productDetails from './productDetails';
import productList from './productList';
import cart from './cart';
import user from './user';

export const productDetailsReducer = productDetails;
export const productListReducer = productList;
export const cartReducer = cart;
export const userReducer = user;

const reducers = {
	productDetails,
	productList,
	cart,
	user,
};

export default reducers;

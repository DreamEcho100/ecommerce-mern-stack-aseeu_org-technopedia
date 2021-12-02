import productDetails from './productDetails';
import productList from './productList';
import cart from './cart';

export const productDetailsReducer = productDetails;
export const productListReducer = productList;
export const cartReducer = cart;

const reducers = {
	productDetails,
	productList,
	cart,
};

export default reducers;

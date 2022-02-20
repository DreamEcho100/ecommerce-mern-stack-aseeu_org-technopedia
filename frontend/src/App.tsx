import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	// Route,
	// Routes,
	useRoutes,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import './App.css';

import { isUserAdmin } from 'src/store/actions/user';
import { useMainStoreSelector } from 'src/store';

import MainLayout from './components/Layout/MainLayout';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import UsersListScreen from './screens/UsersList';
import UserEditScreen from './screens/UserEdit';
import ProductsListScreen from './screens/ProductsList';
import ProductEditScreen from './screens/ProductEdit';
import OrdersListScreen from './screens/OrdersList';

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: '/login', element: <LoginScreen /> },
		{ path: '/register', element: <RegisterScreen /> },
		{ path: '/profile', element: <ProfileScreen /> },
		{ path: '/shipping', element: <ShippingScreen /> },
		{ path: '/payment', element: <PaymentScreen /> },
		{ path: '/placeOrder', element: <PlaceOrderScreen /> },
		{ path: '/order/:id', element: <OrderScreen /> },
		{ path: '/product/:id', element: <ProductScreen /> },
		{
			path: '/cart/:id/*', // /?
			element: <CartScreen />,
		},
		{ path: '/cart', element: <CartScreen /> },
		{ path: '/admin/usersList', element: <UsersListScreen /> },
		{ path: '/admin/user/:id/edit', element: <UserEditScreen /> },
		{ path: '/admin/productsList', element: <ProductsListScreen /> },
		{ path: '/admin/product/:id/edit', element: <ProductEditScreen /> },
		{ path: '/admin/ordersList', element: <OrdersListScreen /> },
		{ path: '/', element: <HomeScreen /> },
		// ...
	]);

	/*
	<Routes>
		<Route path='/welcome' element={<HomeScreen />} />
		<Route path='/product/:id' element={<ProductScreen />} />
		<Route path='/cart/:id?' element={<CartScreen />} />
	</Routes>
	*/

	return routes;
};

const App = (): JSX.Element => {
	const dispatch = useDispatch();
	const userInfo = useMainStoreSelector().user.info;

	useEffect(() => {
		dispatch(isUserAdmin(!!userInfo?.isAdmin));
	}, [dispatch, userInfo?.isAdmin]);

	return (
		<Router>
			<MainLayout>
				<main className='py-3'>
					<Container>
						<AppRoutes />
					</Container>
				</main>
			</MainLayout>
		</Router>
	);
};

export default App;

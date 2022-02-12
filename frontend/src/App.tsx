import {
	BrowserRouter as Router,
	// Route,
	// Routes,
	useRoutes,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';

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
import UserListScreen from './screens/UserList';

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
		{ path: '/admin/usersList', element: <UserListScreen /> },
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

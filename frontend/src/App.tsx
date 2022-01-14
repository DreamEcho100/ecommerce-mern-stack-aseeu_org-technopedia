// import React from 'react';
import {
	BrowserRouter as Router,
	// Route,
	// Routes,
	useRoutes,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';

import MainLayout from './components/Layout/MainLayout/index';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: '/login', element: <LoginScreen /> },
		{ path: '/register', element: <RegisterScreen /> },
		{ path: '/profile', element: <ProfileScreen /> },
		{ path: '/', element: <HomeScreen /> },
		{ path: '/product/:id', element: <ProductScreen /> },
		{
			path: '/cart/:id/*', // /?
			element: <CartScreen />,
		},
		{ path: '/cart', element: <CartScreen /> },
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

function App() {
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
}

export default App;

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
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const AppRoutes = () => {
	let routes = useRoutes([
		{ path: '/', element: <HomeScreen /> },
		{ path: '/product/:id', element: <ProductScreen /> },
		// ...
	]);

	/* <Route path='/welcome' element={<Welcome />} />
	<Route path='/products' element={<Products />} />
	<Route path='/products/:productId' element={<ProductDetail />} /> */

	return routes;
};

function App() {
	return (
		<div className='App'>
			<Router>
				<MainLayout>
					<main className='py-3'>
						<Container>
							<AppRoutes />
						</Container>
					</main>
				</MainLayout>
			</Router>
		</div>
	);
}

export default App;

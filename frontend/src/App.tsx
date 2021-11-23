// import React from 'react';
import { Container } from 'react-bootstrap';

import './App.css';

import MainLayout from './components/Layout/MainLayout/index';

function App() {
	return (
		<div className='App'>
			<MainLayout>
				<Container>
					<h1>Hello this is my first code</h1>
				</Container>
			</MainLayout>
		</div>
	);
}

export default App;

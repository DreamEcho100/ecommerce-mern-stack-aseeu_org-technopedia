// import React from 'react';
import { useState, useEffect } from 'react';
import { Products } from 'src/react-app-env';
import { Row, Col } from 'react-bootstrap';

import ProductComponent from 'src/components/UI/V1/Product';

const HomeScreen = () => {
	const [products, setProducts] = useState<Products | []>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const result: Products | [] = await fetch(
				`${'http://localhost:5000'}/api/v1/products`
			)
				.then((response) => response.json())
				.catch((error) => {
					console.error(`Error, ${error.message}`);
					return [];
				});

			setProducts(result);
		};
		fetchProducts();
	}, []);

	return (
		<main>
			<h1>Latest products</h1>
			<Row>
				{products.map((singleProduct) => {
					return (
						<Col sm={12} md={6} key={singleProduct._id}>
							<ProductComponent singleItem={singleProduct} />
						</Col>
					);
				})}
			</Row>
		</main>
	);
};

export default HomeScreen;

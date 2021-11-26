// import React from 'react';
import Products from 'src/products';
import { Row, Col } from 'react-bootstrap';
import ProductComponent from 'src/components/UI/V1/Product';

interface Props {}

const HomeScreen = (props: Props) => {
	return (
		<main>
			<h1>Latest products</h1>
			<Row>
				{Products.map((singleProduct) => {
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

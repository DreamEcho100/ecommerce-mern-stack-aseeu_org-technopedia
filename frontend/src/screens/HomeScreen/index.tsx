import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from 'src/store/actions/productActions';
import { useTrackedSelector } from 'src/store';

import ProductComponent from 'src/components/UI/V1/Product';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const { loading, error, products } = useTrackedSelector().productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<main>
			<h1>Latest Products</h1>
			{loading ? (
				<h2>Loading...</h2>
			) : error ? (
				<h3>{error}</h3>
			) : (
				<Row>
					{products.map((product, indx) => (
						<Col key={indx} sm={12} md={6} lg={4} xl={3}>
							<ProductComponent singleItem={product} />
						</Col>
					))}
				</Row>
			)}
		</main>
	);
};

export default HomeScreen;

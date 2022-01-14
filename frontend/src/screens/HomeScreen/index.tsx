import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { handleListProducts } from 'src/store/actions/productsList';
import { useTrackedSelector } from 'src/store';

import ProductComponent from 'src/components/UI/V1/Product';
import Loader from 'src/components/UI/V1/Loader';
import Message from 'src/components/UI/V1/Message';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const { isLoading, error, products } = useTrackedSelector().productList;

	useEffect(() => {
		dispatch(handleListProducts());
	}, [dispatch]);

	return (
		<main>
			<h1 className='text-center'>Latest Products</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
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

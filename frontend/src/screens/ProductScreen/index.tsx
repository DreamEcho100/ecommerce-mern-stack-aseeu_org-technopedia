// import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTrackedSelector } from 'src/store';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Product } from 'src/react-app-env';
import { handleProductDetails } from 'src/store/actions';

import classes from './styles.module.css';

import Rating from 'src/components/UI/V1/Rating';
import Loader from 'src/components/UI/V1/Loader';
import Message from 'src/components/UI/V1/Message';

interface Props {
	// ...
}

const ProductScreen = (props: Props) => {
	const params = useParams();

	// const [product, setProduct] = useState<Product>(productDefault);

	// useEffect(() => {
	// 	const fetchProduct = async () => {
	// 		await fetch(`${'http://localhost:5000'}/api/v1/products/${params.id}`)
	// 			.then((response) => response.json())
	// 			.then((data) => setProduct(data))
	// 			.catch((error) => {
	// 				console.error(`Error, ${error.message}`);
	// 				return productDefault;
	// 			});
	// 	};

	// 	fetchProduct();
	// }, [params.id]);
	const dispatch = useDispatch();

	const { loading, error, product } = useTrackedSelector().productDetails;

	useEffect(() => {
		if (typeof params.id === 'string')
			dispatch(handleProductDetails(params.id));
	}, [dispatch, params.id]);

	return (
		<section className={classes.product}>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Container className='p-0'>
							<Image src={product.image} alt={product.name} fluid />
						</Container>
						<Container className='p-0'>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Price:</strong>
											</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Status:</strong>
											</Col>
											<Col>
												<strong>
													{
														// product.countInStock > 0
														product.countInStock === 0
															? 'In Stock'
															: 'Out Of Stock'
													}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Button
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
											title={
												product.countInStock === 0
													? 'Item is not available'
													: `Add ${product.name} to the cart`
											}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Container>
					</Col>
					<Col md={6}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			)}
		</section>
	);
};

export default ProductScreen;

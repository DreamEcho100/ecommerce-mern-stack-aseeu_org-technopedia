// import React from 'react';
import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useMainStoreSelector } from 'src/store';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { handleProductDetails } from 'src/store/actions/productDetails';
// import { useHistory } from 'react-router-dom';

import classes from './styles.module.css';

import Rating from 'src/components/UI/V1/Rating';
import Loader from 'src/components/UI/V1/Loader';
import Message from 'src/components/UI/V1/Message';

interface Props {}

const ProductScreen = (props: Props): JSX.Element => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, error, product } = useMainStoreSelector().productDetails;
	const [quantity, setQuantity] = useState(1);

	const addToCartHandler = () => {
		navigate(`/cart/${params.id}/?quantity=${quantity}`, { replace: true });
	};

	useEffect(() => {
		if (typeof params.id === 'string')
			dispatch(handleProductDetails(params.id));
	}, [dispatch, params.id]);

	return (
		<section className={classes.product}>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{isLoading ? (
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
															? 'Out Of Stock'
															: 'In Stock'
													}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Quantity</Col>
												<Col>
													<Form.Control
														as='select'
														value={quantity}
														onChange={(event: ChangeEvent<HTMLInputElement>) =>
															setQuantity(parseInt(event.target.value))
														}
													>
														{
															// [...new Array(product.countInStock)].keys()
															// Type 'IterableIterator<number>' is not an array type or a string type.
															// Use compiler option '--downlevelIteration' to allow iterating of iterators.ts(2569)
															new Array(product.countInStock)
																.fill(null)
																.map((_, index) => (
																	<option key={index + 1} value={index + 1}>
																		{index + 1}
																	</option>
																))
														}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
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

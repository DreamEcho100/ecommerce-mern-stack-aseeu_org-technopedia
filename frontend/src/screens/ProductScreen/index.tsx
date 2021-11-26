// import React from 'react';
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

import classes from './styles.module.css';

import Rating from 'src/components/UI/V1/Rating';
import products from 'src/products';

interface Props {
	// ...
}

const ProductScreen = (props: Props) => {
	const params = useParams();

	const singleProduct = products.find((product) => {
		return product._id === params.id;
	});

	return (
		<section className={classes.singleProduct}>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Container style={{ padding: '0' }}>
						<Image src={singleProduct?.image} alt={singleProduct?.name} fluid />
					</Container>
					<Container style={{ padding: '0' }}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${singleProduct?.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{
												// singleProduct?.countInStock > 0
												singleProduct?.countInStock === 0
													? 'In Stock'
													: 'Out Of Stock'
											}
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										disabled={singleProduct?.countInStock === 0}
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
							<h3>{singleProduct?.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={singleProduct?.rating}
								text={`${singleProduct?.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: ${singleProduct?.price}</ListGroup.Item>
						<ListGroup.Item>
							Description: {singleProduct?.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</section>
	);
};

export default ProductScreen;

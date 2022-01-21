import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	// Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
} from 'react-bootstrap';

import { resetCart } from 'src/store/actions/cart';
import { getOrderDetails } from 'src/store/actions/order';
import { useMainStoreSelector } from 'src/store';

import Message from 'src/components/UI/Message';
import Loader from 'src/components/UI/Loader';
import { addDecimals } from 'src/lib/core/cart';

const OrderScreen = () => {
	const orderId = useParams().id;

	const dispatch = useDispatch();

	// const orderDetails = useSelector((state) => state.orderDetails)
	// const { order, isLoading, error } = orderDetails
	const { data: order, isLoading, error } = useMainStoreSelector().orderDetails;

	if (!isLoading) {
		//   Calculate prices
		// const addDecimals = (num) => {
		//   return (Math.round(num * 100) / 100).toFixed(2)
		// }
		// order.itemsPrice = addDecimals(
		//   order?.items.reduce((acc, item) => acc + item.price * item.qty, 0)
		// )
	}

	useEffect(() => {
		if (!error && orderId && (!order || order._id !== orderId)) {
			dispatch(getOrderDetails(orderId));
			dispatch(resetCart());
		}
	}, [dispatch, order, orderId, error]);

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {order?._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order?.userRef?.name}
							</p>
							<p>
								<strong>Email: </strong>{' '}
								<a href={`mailto:${order?.userRef?.email}`}>
									{order?.userRef?.email}
								</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order?.shippingAddress?.address},{' '}
								{order?.shippingAddress?.city}{' '}
								{order?.shippingAddress?.postalCode},{' '}
								{order?.shippingAddress?.country}
							</p>
							{order?.isDelivered ? (
								<Message variant='success'>
									Delivered on {order?.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order?.paymentMethod}
							</p>
							{order?.isPaid ? (
								<Message variant='success'>Paid on {order?.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order?.items?.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order?.items?.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.quantity} x ${addDecimals(item.price)} = $
													{addDecimals(item.quantity * item.price)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order?.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order?.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order?.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order?.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;

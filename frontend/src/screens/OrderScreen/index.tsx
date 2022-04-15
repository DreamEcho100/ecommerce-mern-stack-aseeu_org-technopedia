import { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import { BACK_END_ROOT_URL } from '@src/config';
import { useMainStoreSelector } from '@src/store';
import { addDecimals } from '@src/lib/core/cart';
import {
	getOrderDetails,
	payOrderAfterPayment,
	payOrderReset,
	updateOrderDetails,
} from '@src/store/actions/order';
import { resetCart } from '@src/store/actions/cart';
import { handleFormatDate } from '@src/lib/core/date';
import {
	adminOrderDeliveredRequest,
	adminOrderDeliveredRequestReset,
} from '@src/store/actions/user';

import Message from '@src/components/UI/Message';
import Loader from '@src/components/UI/Loader';

const OrderScreen = () => {
	const orderId = useParams().id;

	const dispatch = useDispatch();

	// const orderDetails = useSelector((state) => state.orderDetails)
	const { orderDetails, orderPay } = useMainStoreSelector();
	const { data: order, isLoading, error } = orderDetails;
	const { isLoading: loadingPay, success: successPay } = orderPay;

	const [sdkReady, setSdkReady] = useState(false);

	const adminData = useMainStoreSelector().admin;
	const userInfo = useMainStoreSelector().user?.info;

	const updateOrderDelivery = adminData?.actions.requests.orderDelivery;
	const updateOrderDeliveryIsLoading = updateOrderDelivery?.isLoading;
	const updateOrderDeliveryError = updateOrderDelivery?.error;
	const updateOrderDeliverySuccess = updateOrderDelivery?.success;

	const successPaymentHandler = ({
		id,
		status,
		update_time,
		payer: { email_address },
	}: {
		id: string;
		status: string;
		update_time: string;
		payer: { email_address: string };
	}) => {
		if (!orderId) return;

		const paymentResult = {
			id,
			status,
			time: update_time,
			payer: { email_address },
		};

		dispatch(payOrderAfterPayment(orderId, paymentResult));
		dispatch(resetCart());
	};

	const updateOrderDetailsHandler = async () => {
		if (!orderDetails.data?._id) return;

		// const updatedOrder = await dispatch(
		// 	adminOrderDeliveredRequest(orderDetails.data._id)
		// );

		if (await dispatch(adminOrderDeliveredRequest(orderDetails.data._id))) {
			// if (updatedOrder?._id) {
			dispatch(
				updateOrderDetails({
					isDelivered: true,
					deliveredAt: Date.now(),
				})
			);
		}
	};

	useEffect(() => {
		dispatch(adminOrderDeliveredRequestReset());
	}, [dispatch]);

	useEffect(() => {
		if (!orderId) return;

		const addPayPalScript = async () => {
			try {
				const clientId = await fetch(
					`${BACK_END_ROOT_URL}/api/config/paypal`
				).then((response) => response.json());

				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
				script.async = true;
				script.onload = () => {
					setSdkReady(true);
				};
				document.body.appendChild(script);
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
				}
			}
		};

		if (
			orderId &&
			// !orderDetails.error &&
			(!order || !order._id || order._id !== orderId || successPay)
		) {
			dispatch(payOrderReset());
			dispatch(getOrderDetails(orderId));
		} else if (order && !order.isPaid) {
			if (!window.paypal) {
				// running the sdk javaScript
				addPayPalScript();
			} else {
				setSdkReady(true);
				// some condition
			}
		}
	}, [dispatch, orderId, successPay, order, error]);

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
									Delivered on: {handleFormatDate(order.deliveredAt)}
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
								<Message variant='success'>
									Paid on: {handleFormatDate(order.paidAt)}
								</Message>
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
							{order && !order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}

							{userInfo?.isAdmin &&
								order &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										{!updateOrderDeliveryIsLoading ? (
											<>
												<Button
													type='button'
													className='btn btn-block btn-warning'
													onClick={updateOrderDetailsHandler}
												>
													Mark As Delivered
												</Button>
												{updateOrderDeliveryError && (
													<Message variant='danger'>
														{updateOrderDeliveryError}
													</Message>
												)}
											</>
										) : (
											<Loader />
										)}
									</ListGroup.Item>
								)}

							{updateOrderDeliverySuccess && (
								<ListGroup.Item>
									<Message variant='success'>
										Updated order to be delivered successfully!
									</Message>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;

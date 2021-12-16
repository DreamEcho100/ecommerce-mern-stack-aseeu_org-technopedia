// import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';

import Message from 'src/components/UI/V1/Message';
import { addToCart, removeFromCart } from 'src/store/actions/cart';
import { useNavigate, useParams } from 'react-router';
import { useTrackedSelector } from 'src/store';
import { CART_ITEM_TYPE } from 'src/store/ts/types';

interface Props {}

const CartScreen = (props: Props) => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cartItems = useTrackedSelector().cart.items;

	const productId = params.id;
	const quantity = window?.location?.search
		? Number(window.location.search.split('=')[1])
		: 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = (_id: CART_ITEM_TYPE['_id']) => {
		dispatch(removeFromCart(_id));
	};

	const checkoutHandler = () => {
		navigate('/login/?redirect=shipping');
	};

	const calculateSubtotal = (items: typeof cartItems) => {
		let total: number = 0;
		let i: number = 0;
		for (i = 0; i < items.length; i++) {
			total += items[i].quantity;
		}

		return total;
	};

	const calculatePrice = (items: typeof cartItems) => {
		// cartItems
		// 	.reduce((acc: number, item: CART_ITEM_TYPE) => acc + item.quantity * item.price, 0)
		// 	.toFixed(2)
		let total: number = 0;
		let i: number = 0;
		for (i = 0; i < items.length; i++) {
			total += items[i].quantity * items[i].price;
		}

		return total;
	};

	return (
		<Row>
			<Col md={8}>
				<h1 className='h1-l'>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item, index) => (
							<ListGroup.Item key={index}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.quantity}
											onChange={(e) =>
												dispatch(addToCart(item._id, Number(e.target.value)))
											}
										>
											{new Array(item.countInStock)
												.fill(undefined)
												.map((_, index) => (
													<option key={index + 1} value={index + 1}>
														{index + 1}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>
								Subtotal (
								{
									calculateSubtotal(cartItems)
									// (cartItems as CART_ITEM_TYPE[])
									// 	.reduce((acc: number | Array<string>, item: number | string | CART_ITEM_TYPE) =>
									// 		parseInt(acc) + parseInt(item.quantity), 0)
								}
								) items
							</h3>
							$
							{
								calculatePrice(cartItems)
								// cartItems
								// .reduce((acc: number, item: CART_ITEM_TYPE) => acc + item.quantity * item.price, 0)
								// .toFixed(2)
							}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
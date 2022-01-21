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

import Message from 'src/components/UI/Message';
import { addToCart, removeFromCart } from 'src/store/actions/cart';
import { useNavigate, useParams } from 'react-router';
import { useMainStoreSelector } from 'src/store';
import { ICartItem } from 'src/react-app-env.d';
import { calcItemsPrice, calcItemsQuantity } from 'src/lib/core/cart';

interface Props {}

const CartScreen = (props: Props): JSX.Element => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cartItems = useMainStoreSelector().cart?.items;

	const productId = params.id;
	const quantity = window?.location?.search
		? Number(window.location.search.split('=')[1])
		: 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = (_id: ICartItem['_id']) => {
		dispatch(removeFromCart(_id));
	};

	const checkoutHandler = () => {
		navigate('/login/?redirect=shipping', { replace: true });
	};

	// const calculateSubtotal = (items: typeof cartItems) => {
	// 	let total: number = 0;
	// 	let i: number = 0;
	// 	for (i = 0; i < items.length; i++) {
	// 		total += items[i].quantity;
	// 	}

	// 	return addDecimals(total);
	// };

	// const calculatePrice = (items: typeof cartItems) => {
	// 	// cartItems
	// 	// 	.reduce((acc: number, item: ICartItem) => acc + item.quantity * item.price, 0)
	// 	// 	.toFixed(2)
	// 	let total: number = 0;
	// 	let i: number = 0;
	// 	for (i = 0; i < items.length; i++) {
	// 		total += items[i].quantity * items[i].price;
	// 	}

	// 	return addDecimals(total);
	// };

	// if (!cartItems || cartItems.length === 0) navigate('/cart');

	return (
		<Row>
			<Col md={8}>
				<h1 className='h1-l'>Shopping Cart</h1>
				{!cartItems || cartItems.length === 0 ? (
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
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												dispatch(
													addToCart(item._id, Number(event.target.value))
												)
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
							<h3>Subtotal ({calcItemsPrice(cartItems)}) items</h3>$
							{calcItemsQuantity(cartItems)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={!cartItems || cartItems.length === 0}
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

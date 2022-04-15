import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { IUser } from '@src/vite-env';
import { useMainStoreSelector } from '@src/store';
import { getUserDetails, updateUserProfile } from '@src/store/actions/user';
import { getOrdersList } from '@src/store/actions/order';

import Message from '@src/components/UI/Message';
import Loader from '@src/components/UI/Loader';
import CustomLinkContainer from '@src/components/UI/CustomLinkContainer';
import { handleFormatDate } from '@src/lib/core/date';
// import { LinkContainer } from 'react-router-bootstrap';

interface Props {}

const ProfileScreen = (props: Props): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, ordersList } = useMainStoreSelector();
	const {
		info: userInfo,
		actions: { requests },
	} = user;
	const {
		isLoading: isLoadingOrdersList,
		error: errorOrdersList,
		data: ordersListData,
	} = ordersList;

	const [name, setName] = useState<IUser['name']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<IUser['password']>('');
	const [confirmPassword, setConfirmPassword] = useState<IUser['password']>('');
	const [message, setMessage] = useState<string>('');

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();

		setMessage('');

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else if (!userInfo || !userInfo._id) {
			setMessage('User data not found!');
		} else {
			dispatch(updateUserProfile({ _id: userInfo._id, name, email, password }));
		}
	};

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login', { replace: true });
		} else {
			if (!userInfo.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(userInfo.name);
				setEmail(userInfo.email);
			}
			dispatch(getOrdersList());
		}
	}, [dispatch, navigate, userInfo]);

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{requests.userDetails.isLoading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setName(event.target.value)
							}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setConfirmPassword(event.target.value)
							}
						></Form.Control>
					</Form.Group>

					{message && (
						<Message variant='danger' className='my-3'>
							{message}
						</Message>
					)}
					{(requests.userDetails.error || requests.updateUserProfile.error) && (
						<Message variant='danger' className='my-3'>
							{requests.userDetails.error || requests.updateUserProfile.error}
						</Message>
					)}
					{requests.updateUserProfile.success && (
						<Message variant='success' className='my-3'>
							Profile Updated!
						</Message>
					)}

					<Button
						className='my-3'
						type='submit'
						variant='primary'
						disabled={requests.updateUserProfile.isLoading}
					>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{isLoadingOrdersList ? (
					<Loader />
				) : errorOrdersList ? (
					<Message variant='danger'>{errorOrdersList}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ordersListData.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{handleFormatDate(order.createdAt)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid && order.paidAt ? (
											handleFormatDate(order.paidAt)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered && order.deliveredAt ? (
											handleFormatDate(order.deliveredAt)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<CustomLinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant='light'>
												Details
											</Button>
										</CustomLinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { IUser } from 'src/react-app-env';
import { useTrackedSelector } from 'src/store';
import { getUserDetails, updateUserProfile } from 'src/store/actions/user';

import Message from 'src/components/UI/V1/Message';
import Loader from 'src/components/UI/V1/Loader';

interface Props {}

const ProfileScreen = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		info,
		actions: { requestUpdateUserProfile, requestUserDetails },
	} = useTrackedSelector().user;

	const [name, setName] = useState<IUser['name']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<IUser['password']>('');
	const [confirmPassword, setConfirmPassword] = useState<IUser['password']>('');
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		if (!info._id) {
			navigate('/login');
		} else {
			if (!info.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(info.name);
				setEmail(info.email);
			}
		}
	}, [dispatch, navigate, info]);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		setMessage('');

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ _id: info._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{requestUserDetails.isLoading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setConfirmPassword(event.target.value)
							}
						></Form.Control>
					</Form.Group>

					{message && (
						<Message variant='danger' className='my-3'>
							{message}
						</Message>
					)}
					{(requestUserDetails.error || requestUpdateUserProfile.error) && (
						<Message variant='danger' className='my-3'>
							{requestUserDetails.error || requestUpdateUserProfile.error}
						</Message>
					)}
					{requestUpdateUserProfile.success && (
						<Message variant='success' className='my-3'>
							Profile Updated
						</Message>
					)}

					<Button className='my-3' type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { IUser } from 'src/react-app-env';
import { handleUserRegister } from 'src/store/actions/user';
import { useTrackedSelector } from 'src/store';

import Message from 'src/components/UI/V1/Message';
import Loader from 'src/components/UI/V1/Loader';
import FormContainer from 'src/components/UI/V1/FormContainer';

interface Props {}

const RegisterScreen = (props: Props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// const userLogin = useSelector((state) => state.userLogin)
	const { isLoading, error, info } = useTrackedSelector().user;

	const [name, setName] = useState<IUser['name']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<IUser['password']>('');
	const [confirmPassword, setConfirmPassword] = useState<IUser['password']>('');
	const [message, setMessage] = useState<string | null>(null);

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (info._id) {
			navigate(redirect);
		}
	}, [navigate, info, redirect]);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage('passwords do not match');
		} else {
			dispatch(handleUserRegister(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{isLoading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='Name'>
					<Form.Label>name</Form.Label>
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
				{error && (
					<Message variant='danger' className='my-3'>
						{error}
					</Message>
				)}

				<Button
					disabled={isLoading}
					className='my-3'
					type='submit'
					variant='primary'
				>
					Register
				</Button>
			</Form>

			<Row className='my-3'>
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useMainStoreSelector } from 'src/store';
import { useNavigate, useLocation } from 'react-router-dom';

import { IUser } from 'src/react-app-env';
import { handleUserLogin } from 'src/store/actions/user';

import Message from 'src/components/UI/V1//Message';
import Loader from 'src/components/UI/V1//Loader';
import FormContainer from 'src/components/UI/V1//FormContainer';

const LoginScreen = (): JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	// const userLogin = useSelector((state) => state.userLogin)
	const { isLoading, error, info } = useMainStoreSelector().user;

	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<IUser['password']>('');

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (info?._id?.length !== 0) {
			navigate(redirect);
		}
	}, [navigate, info, redirect]);

	const submitHandler = (event: FormEvent) => {
		dispatch(handleUserLogin(email, password));
		event.preventDefault();
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{isLoading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setEmail(event.target.value);
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setPassword(event.target.value);
						}}
					></Form.Control>
				</Form.Group>

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
					Sign In
				</Button>
			</Form>

			<Row className='my-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;

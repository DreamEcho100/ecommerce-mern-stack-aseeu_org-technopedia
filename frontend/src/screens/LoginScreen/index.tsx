import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTrackedSelector } from 'src/store';
import { useNavigate, useLocation } from 'react-router-dom';

import { handleUserLogin } from 'src/store/actions/user';

import Message from 'src/components/UI/V1//Message';
import Loader from 'src/components/UI/V1//Loader';
import FormContainer from 'src/components/UI/V1//FormContainer';

const LoginScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	// const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, info } = useTrackedSelector().user;

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (info?._id?.length !== 0) {
			navigate(redirect);
		}
	}, [navigate, info, redirect]);

	const submitHandler = (e: React.FormEvent) => {
		dispatch(handleUserLogin(email, password));
		e.preventDefault();
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value);
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value);
						}}
					></Form.Control>
				</Form.Group>

				{error && <Message variant='danger'>{error}</Message>}

				<Button
					disabled={loading}
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

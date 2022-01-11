import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTrackedSelector } from 'src/store';
import Message from 'src/components/UI/V1/Message';
import Loader from 'src/components/UI/V1/Loader';
import FormContainer from 'src/components/UI/V1/FormContainer';
import { handleUserRegister } from 'src/store/actions/user';

interface Props {}

const RegisterScreen = (props: Props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, info } = useTrackedSelector().user;

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [message, setMessage] = useState<string | null>(null);

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (info?._id?.length !== 0) {
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
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='Name'>
					<Form.Label>name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setName(e.target.value)
						}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setConfirmPassword(e.target.value)
						}
					></Form.Control>
				</Form.Group>

				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}

				<Button
					disabled={loading}
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

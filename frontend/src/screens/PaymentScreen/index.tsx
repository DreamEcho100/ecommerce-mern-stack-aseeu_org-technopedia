import { FormEvent, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { savePaymentMethod } from 'src/store/actions/cart';
import { useMainStoreSelector } from 'src/store';
import { TPaymentMethod } from 'src/react-app-env';

import FormContainer from 'src/components/UI/FormContainer';
import CheckoutSteps from 'src/components/UI/CheckoutSteps';

const PaymentScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const cart = useSelector((state) => state.cart)
	// const { shippingAddress } = cart
	const { cart } = useMainStoreSelector();
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		navigate('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>(
		cart.paymentMethod // || 'PayPal'
	);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeOrder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Methods</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked={paymentMethod === 'PayPal'}
							onChange={() => setPaymentMethod('PayPal')}
						></Form.Check>
						<Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							checked={paymentMethod === 'Stripe'}
							onChange={() => setPaymentMethod('Stripe')}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button
					disabled={!paymentMethod}
					className='my-3'
					type='submit'
					variant='primary'
				>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;

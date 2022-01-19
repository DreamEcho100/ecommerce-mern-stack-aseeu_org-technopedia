import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useMainStoreSelector } from 'src/store';
import { saveShippingAddress } from 'src/store/actions/cart';

import FormContainer from 'src/components/UI/V1/FormContainer';
import CheckoutSteps from 'src/components/UI/V1/CheckoutSteps';

interface Props {}

const ShippingScreen = (props: Props): JSX.Element => {
	const navigate = useNavigate();

	// const cart = useSelector((state) => state.cart)
	// const { shippingAddress } = cart
	const { shippingAddress } = useMainStoreSelector().cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						required
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setAddress(event.target.value)
						}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						required
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setCity(event.target.value)
						}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						required
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setPostalCode(event.target.value)
						}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						required
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setCountry(event.target.value)
						}
					></Form.Control>
				</Form.Group>

				<Button className='my-3' type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;

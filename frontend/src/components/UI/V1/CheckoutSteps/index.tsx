import { Nav } from 'react-bootstrap';
import CustomLinkContainer from '../CustomLinkContainer';

interface IProps {
	step1?: boolean;
	step2?: boolean;
	step3?: boolean;
	step4?: boolean;
}

const CheckoutSteps = ({ step1, step2, step3, step4 }: IProps) => {
	return (
		<Nav className='justify-content-center'>
			<Nav.Item>
				{step1 ? (
					<CustomLinkContainer
						to='/login'
						navigateExtraProps={{ replace: true }}
					>
						Sign In
					</CustomLinkContainer>
				) : (
					<Nav.Link disabled> Sign In</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step2 ? (
					<CustomLinkContainer
						to='/shipping'
						navigateExtraProps={{ replace: true }}
					>
						Shipping
					</CustomLinkContainer>
				) : (
					<Nav.Link disabled> Shipping</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3 ? (
					<CustomLinkContainer
						to='/payment'
						navigateExtraProps={{ replace: true }}
					>
						Payment
					</CustomLinkContainer>
				) : (
					<Nav.Link disabled> Payment </Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step4 ? (
					<CustomLinkContainer
						to='/placeOrder'
						navigateExtraProps={{ replace: true }}
					>
						Place orde
					</CustomLinkContainer>
				) : (
					<Nav.Link disabled> Place order</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;

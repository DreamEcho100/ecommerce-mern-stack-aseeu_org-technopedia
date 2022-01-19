import { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface IProps {
	children: ReactNode;
}

const FormContainer = ({ children }: IProps): JSX.Element => {
	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col xs={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;

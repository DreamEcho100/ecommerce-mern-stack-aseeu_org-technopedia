import { Container, Row, Col } from 'react-bootstrap';

interface Props {}

const Footer = (props: Props): JSX.Element => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className='text-center py-3'>Copyright &copy; ProShop</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;

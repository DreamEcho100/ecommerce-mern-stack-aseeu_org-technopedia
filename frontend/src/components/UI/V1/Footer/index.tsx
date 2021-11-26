import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {}

const Footer = (props: Props) => {
	return (
		<footer>
			<Container>
				<Row>
					<Col>CopyRights@2021</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;

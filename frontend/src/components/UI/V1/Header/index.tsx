import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { /* Link */ NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';

interface Props {}

const Header = (props: Props) => {
	const navigate = useNavigate();

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Navbar.Brand>
						<NavLink to='/'>
							<Navbar.Brand>our shop</Navbar.Brand>
						</NavLink>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{/* <LinkContainer to='/cart'> */}
							<Nav.Link
								href='/cart'
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.preventDefault();
									navigate('cart');
								}}
							>
								<i className='fas fa-shopping-cart'></i> Cart
							</Nav.Link>
							{/* </LinkContainer> */}

							{/* <LinkContainer to='/signin'> */}
							<Nav.Link
								href='/login'
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.preventDefault();
									navigate('login');
								}}
							>
								<i className='fas fa-user'></i> Sign In
							</Nav.Link>
							{/* </LinkContainer> */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

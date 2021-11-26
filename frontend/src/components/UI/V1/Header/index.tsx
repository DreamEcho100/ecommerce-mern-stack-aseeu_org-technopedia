// import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { /* Link */ NavLink } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';

interface Props {}

const Header = (props: Props) => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Navbar.Brand href='/'>
						<NavLink to='/'>
							<Navbar.Brand>our shop</Navbar.Brand>
						</NavLink>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<NavLink to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</NavLink>

							<NavLink to='/signin'>
								<Nav.Link>
									<i className='fas fa-user'></i> Sign In
								</Nav.Link>
							</NavLink>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

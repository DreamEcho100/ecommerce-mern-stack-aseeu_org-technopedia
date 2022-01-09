import { useDispatch } from 'react-redux';
import { useTrackedSelector } from 'src/store';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { /* Link */ NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
import { handleUserLogout } from 'src/store/actions/user';

interface Props {}

const Header = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { info } = useTrackedSelector().user;

	const logoutHandler = () => {
		dispatch(handleUserLogout());
	}

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

							{info?._id?.length !== 0 ? (
								<NavDropdown title= {info.name} id='username'>
											<NavDropdown.Item
												href='/profile'
												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
													e.preventDefault();
													navigate('profile');
												}}
											>
												Profile
											</NavDropdown.Item>
										<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Link
									href='/login'
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.preventDefault();
										navigate('login');
									}}
								>
									<i className='fas fa-user'></i> Sign In
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

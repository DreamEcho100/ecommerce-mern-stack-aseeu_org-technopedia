import { useDispatch } from 'react-redux';
import { useMainStoreSelector } from 'src/store';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { /* Link */ NavLink } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import { handleUserLogout } from 'src/store/actions/user';
import CustomLinkContainer from 'src/components/UI/V1/CustomLinkContainer';
// import CustomLinkContainer from '../CustomLinkContainer';

interface Props {}

const Header = (props: Props): JSX.Element => {
	const dispatch = useDispatch();

	const { info } = useMainStoreSelector().user;

	const logoutHandler = () => {
		dispatch(handleUserLogout());
	};

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
							<CustomLinkContainer to='/cart'>
								<i className='fas fa-shopping-cart'></i> Cart
							</CustomLinkContainer>

							{info?._id && info._id?.length !== 0 ? (
								<NavDropdown title={info.name} id='username'>
									<CustomLinkContainer to='/profile'>
										Profile
									</CustomLinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<CustomLinkContainer to='/login'>
									<i className='fas fa-user'></i> Sign In
								</CustomLinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

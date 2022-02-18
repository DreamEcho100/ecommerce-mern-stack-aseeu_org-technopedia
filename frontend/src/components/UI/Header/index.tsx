import { useDispatch } from 'react-redux';
import { useMainStoreSelector } from 'src/store';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { /* Link */ NavLink } from 'react-router-dom';

import { adminReset, handleUserLogout } from 'src/store/actions/user';
import {
	orderDetailsReset,
	OrdersListReset,
	payOrderReset,
} from 'src/store/actions/order';
import { resetCart } from 'src/store/actions/cart';

import CustomLinkContainer from 'src/components/UI/CustomLinkContainer';
// import { LinkContainer } from 'react-router-bootstrap';

interface Props {}

const Header = (props: Props): JSX.Element => {
	const dispatch = useDispatch();

	const { info: userInfo } = useMainStoreSelector().user;

	const logoutHandler = () => {
		dispatch(adminReset());
		dispatch(orderDetailsReset());
		dispatch(payOrderReset());
		dispatch(OrdersListReset());
		dispatch(
			resetCart({ resetPaymentMethod: true, resetShippingAddress: true })
		);
		dispatch(handleUserLogout());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Navbar.Brand>
						<NavLink to='/'>
							<Navbar.Brand>E-Commerce</Navbar.Brand>
						</NavLink>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<CustomLinkContainer to='/cart' elementType='NavLink'>
								<i className='fas fa-shopping-cart'></i> Cart
							</CustomLinkContainer>

							{userInfo?._id && userInfo._id?.length !== 0 ? (
								<NavDropdown title={userInfo.name} id='username'>
									<CustomLinkContainer
										to='/profile'
										elementType='NavDropdownItem'
									>
										Profile
									</CustomLinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<CustomLinkContainer to='/login' elementType='NavLink'>
									<i className='fas fa-user'></i> Sign In
								</CustomLinkContainer>
							)}

							{userInfo?.isAdmin && (
								<NavDropdown title='Admin' id='adminMenu'>
									<CustomLinkContainer
										to='/admin/usersList'
										elementType='NavDropdownItem'
									>
										Users
									</CustomLinkContainer>
									<CustomLinkContainer
										to='/admin/productsList'
										elementType='NavDropdownItem'
									>
										Products
									</CustomLinkContainer>
									<CustomLinkContainer
										to='/admin/ordersList'
										elementType='NavDropdownItem'
									>
										Orders
									</CustomLinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

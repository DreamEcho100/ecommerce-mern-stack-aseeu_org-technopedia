import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Table, Button } from 'react-bootstrap';

import { useMainStoreSelector } from '@src/store';
import { adminGetOrdersList } from '@src/store/actions/user';
import { handleFormatDate } from '@src/lib/core/date';

import Message from '@src/components/UI/Message';
import Loader from '@src/components/UI/Loader';
import CustomLinkContainer from '@src/components/UI/CustomLinkContainer';

const OrdersListScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userInfo = useMainStoreSelector().user.info;
	const adminData = useMainStoreSelector().admin;

	const ordersList = adminData?.ordersList || [];
	const getOrdersListRequest = adminData?.actions.requests.getOrdersList;

	useEffect(() => {
		if (userInfo?.isAdmin) {
			dispatch(adminGetOrdersList());
		} else {
			navigate('/');
		}
	}, [dispatch, navigate, userInfo?.isAdmin]);

	if (!adminData || !getOrdersListRequest) {
		return <></>;
	}

	return (
		<div>
			<h1> Users </h1>
			{getOrdersListRequest.isLoading ? (
				<Loader />
			) : getOrdersListRequest.error ? (
				<Message variant='danger'> {getOrdersListRequest.error} </Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ordersList.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.userRef && order.userRef.name}</td>
								<td>{handleFormatDate(order.createdAt)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										handleFormatDate(order.paidAt)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isPaid && order.isDelivered ? (
										handleFormatDate(order.deliveredAt)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<CustomLinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											Details
										</Button>
									</CustomLinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default OrdersListScreen;

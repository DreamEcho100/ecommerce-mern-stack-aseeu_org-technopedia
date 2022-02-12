import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
	Table,
	// Button
} from 'react-bootstrap';

import { useMainStoreSelector } from 'src/store';

import Message from 'src/components/Message';
import Loader from 'src/components/Loader';

// import CustomLinkContainer from 'src/components/UI/CustomLinkContainer';
import { adminGetUsersList } from 'src/store/actions/user';

const UserListScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const userList = useSelector((state) => state.userList)
	// const { loading, error, users } = userList
	const adminData = useMainStoreSelector().admin;

	if (!adminData) navigate('/');

	const usersList = adminData.usersList;
	const usersListRequest = adminData.actions.requests.usersList;

	useEffect(() => {
		dispatch(adminGetUsersList);
	}, [dispatch]);

	return (
		<div>
			<h1> Users </h1>
			{usersListRequest.isLoading ? (
				<Loader />
			) : usersListRequest.error ? (
				<Message variant='danger'> {usersListRequest.error} </Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>ADMIN</th>
						</tr>
					</thead>
					<tbody>
						{usersList.map((user) => (
							<tr>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default UserListScreen;

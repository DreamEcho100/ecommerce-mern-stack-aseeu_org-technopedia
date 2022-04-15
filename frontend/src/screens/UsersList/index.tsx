import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Table, Button } from 'react-bootstrap';

import { IBasicUser } from '@src/vite-env';
import { useMainStoreSelector } from '@src/store';

// import { LinkContainer } from 'react-router-bootstrap'
// import CustomLinkContainer from '@src/components/UI/CustomLinkContainer';
import {
	adminDeleteUser,
	adminGetUsersList,
	adminGetUsersListReset,
} from '@src/store/actions/user';

import Message from '@src/components/UI/Message';
import Loader from '@src/components/UI/Loader';
import CustomLinkContainer from '@src/components/UI/CustomLinkContainer';

const UsersListScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const userList = useSelector((state) => state.userList)
	// const { loading, error, users } = userList
	const userInfo = useMainStoreSelector().user.info;
	const adminData = useMainStoreSelector().admin;

	const usersList = adminData?.usersList;
	const usersListRequest = adminData?.actions.requests.usersList;

	const deleteHandler = (_id: string) => {
		if (window.confirm('Are you sure about deleting this user?')) {
			dispatch(adminDeleteUser(_id));
		}
	};

	useEffect(() => {
		dispatch(adminGetUsersListReset());
	}, [dispatch]);

	useEffect(() => {
		if (userInfo?.isAdmin) {
			dispatch(adminGetUsersList());
		} else {
			navigate('/');
		}
	}, [dispatch, navigate, userInfo?.isAdmin]);

	if (!adminData || !usersListRequest || !usersList) {
		navigate('/');
		return <></>;
	}

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
						{usersList.map((user: IBasicUser) => (
							<tr key={user._id}>
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
								<td>
									{/* <CustomLinkContainer to={`/user/${user._id}/edit`}>
                  </CustomLinkContainer> */}
									<Button variant='light' className='btn-sm'>
										<CustomLinkContainer to={`/admin/user/${user._id}/edit`}>
											<i className='fas fa-edit'></i>
										</CustomLinkContainer>
									</Button>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default UsersListScreen;

import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useMainStoreSelector } from 'src/store';
import {
	adminGetSelectedUserInfo,
	adminUpdateSelectedUserInfo,
} from 'src/store/actions/user';

import Message from 'src/components/UI/Message';
import Loader from 'src/components/UI/Loader';
import FormContainer from 'src/components/UI/FormContainer';
import { IUser } from 'src/react-app-env';

type Props = {};

const UserEditScreen = (props: Props) => {
	const params = useParams();
	const navigate = useNavigate();
	const userId = params.id;

	const [name, setName] = useState<IUser['name']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [isAdmin, setIsAdmin] = useState<IUser['isAdmin']>(false);

	const dispatch = useDispatch();

	// const userDetails = useSelector((state) => state.userDetails)
	const admin = useMainStoreSelector()?.admin;

	const selectedUser = admin?.selectedUser;
	const actions = admin?.actions;

	useEffect(() => {
		if (!userId) {
			navigate('/');
			return;
		}
		if (!selectedUser || !selectedUser.name || selectedUser._id !== userId) {
			dispatch(adminGetSelectedUserInfo(userId));
		} else {
			setName(selectedUser.name);
			setEmail(selectedUser.email);
			setIsAdmin(selectedUser.isAdmin);
		}
	}, [dispatch, userId, selectedUser, navigate]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();

		if (!selectedUser?._id) throw new Error("User _id doesn't exist to update");

		const updatedData: {
			name?: IUser['name'];
			email?: IUser['email'];
			isAdmin?: IUser['isAdmin'];
		} = {};

		if (selectedUser?.name !== name) updatedData.name = name;
		if (selectedUser?.email !== email) updatedData.email = email;
		if (selectedUser?.isAdmin !== isAdmin) updatedData.isAdmin = isAdmin;

		dispatch(adminUpdateSelectedUserInfo(selectedUser._id, updatedData));
	};

	if (!admin || !actions) {
		if (!admin) navigate('/');
		return <></>;
	}

	const { isLoading: isLoadingSelectedUser, error: errorSelectedUser } =
		actions?.requests.getSelectedUser;
	const {
		isLoading: isLoadingUpdateSelectedUser,
		error: errorUpdateSelectedUser,
		success: successUpdateSelectedUser,
	} = actions?.requests.updateSelectedUser;

	return (
		<>
			<Link to='/admin/usersList' className='btn btn-light my-3'>
				Go Back
			</Link>
			{!isLoadingSelectedUser && !selectedUser ? (
				<h2>Can't find the user!</h2>
			) : (
				<FormContainer>
					<h1>Edit User</h1>
					{isLoadingSelectedUser ? (
						<Loader />
					) : errorSelectedUser ? (
						<Message variant='danger'>{errorSelectedUser}</Message>
					) : (
						<Form onSubmit={submitHandler}>
							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='name'
									placeholder='Enter name'
									value={name}
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setName(event.target.value)
									}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId='email'>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={email}
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setEmail(event.target.value)
									}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId='isAdmin'>
								<Form.Check
									type='checkbox'
									label='Is Admin'
									checked={isAdmin}
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setIsAdmin(event.target.checked)
									}
								></Form.Check>
							</Form.Group>

							{isLoadingUpdateSelectedUser && <Loader />}

							{errorUpdateSelectedUser && (
								<Message variant='danger' className='my-3'>
									{errorUpdateSelectedUser}
								</Message>
							)}

							{successUpdateSelectedUser && (
								<Message variant='success' className='my-3'>
									User Updated!
								</Message>
							)}

							<Button type='submit' variant='primary'>
								Update
							</Button>
						</Form>
					)}
				</FormContainer>
			)}
		</>
	);
};

export default UserEditScreen;

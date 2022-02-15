import express from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/users';
import { protectMiddleware, adminMiddleware } from '../middleware/auth';

const usersRoutes = express.Router();

usersRoutes
	.route('/')
	.post(registerUser)
	.get(protectMiddleware, adminMiddleware, getUsers);
usersRoutes.post('/login', authUser);
usersRoutes
	.route('/profile')
	.get(protectMiddleware, getUserProfile)
	.put(protectMiddleware, updateUserProfile);
usersRoutes
	.route('/:id')
	.delete(protectMiddleware, adminMiddleware, deleteUser)
	.get(protectMiddleware, adminMiddleware, getUserById)
	.put(protectMiddleware, adminMiddleware, updateUser);

export default usersRoutes;

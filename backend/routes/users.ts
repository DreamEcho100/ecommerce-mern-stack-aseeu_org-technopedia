import express from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
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

export default usersRoutes;

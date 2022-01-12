import express from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/users';
import { protectMiddleware } from '../middleware/auth';

const usersRoutes = express.Router();

usersRoutes.route('/').post(registerUser);
usersRoutes.post('/login', authUser);
usersRoutes
	.route('/profile')
	.get(protectMiddleware, getUserProfile)
	.put(protectMiddleware, updateUserProfile);

export default usersRoutes;

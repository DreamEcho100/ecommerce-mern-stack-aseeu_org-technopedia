import express from 'express';
import { authUser, getUserProfile } from '../controllers/users';
import { protectMiddleware } from '../middleware/auth';

const usersRoutes = express.Router();

usersRoutes.post('/login', authUser);
usersRoutes.route('/profile').get(protectMiddleware, getUserProfile);

export default usersRoutes;

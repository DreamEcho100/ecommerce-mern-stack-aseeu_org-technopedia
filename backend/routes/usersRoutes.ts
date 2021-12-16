import express from 'express';
import { authUser } from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.post('/login', authUser);

export default usersRoutes;

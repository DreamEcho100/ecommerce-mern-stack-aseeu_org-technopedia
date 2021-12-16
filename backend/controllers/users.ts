import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken';
import UserModel from '../models/user';

const authUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {

  res.send('successful calling')
})

export { authUser, getUserProfile };

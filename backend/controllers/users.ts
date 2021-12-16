import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken';
import UserModel from '../models/user';
import { IUserRequest } from '../general';

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

const getUserProfile = asyncHandler(
	async (req: IUserRequest, res: Response) => {
		const user = await UserModel.findById(req.user._id);
		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(404);
			throw new Error('User not found');
		}
	}
);

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const userExist = await UserModel.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error('User already exist');
	}

	const user = await UserModel.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

export { authUser, getUserProfile, registerUser };

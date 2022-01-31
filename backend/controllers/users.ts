import { Request, Response } from 'express';

import generateToken from '../utils/generateToken';
import UserModel from '../models/user';
import { CustomRequest } from '../general';
// import asyncHandler from 'express-async-handler';
import expressAsyncHandler from '../utils/core/express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(
	async (req: CustomRequest, res: Response) => {
		// if (!req.user || !req.user._id) throw new Error('User not found');

		const user = await UserModel.findById(req.user._id);
		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			// res.status(404).send('User not found');
			res.status(404);
			throw new Error('User not found');
		}
	}
);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(
	async (req: CustomRequest, res: Response) => {
		// res.send('successful calling')
		// if (!req.user || !req.user._id) throw new Error('User not found');

		const user = await UserModel.findById(req.user._id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser._id),
			});
		} else {
			res.status(404);
			throw new Error('User not found');
		}
	}
);

export { authUser, getUserProfile, registerUser, updateUserProfile };

import { Request, Response } from 'express';

import generateToken from '../utils/generateToken';
import UserModel from '../models/user';
// import { CustomRequest } from '../general';
import asyncHandler from 'express-async-handler';
import hashPassword from '../utils/hashPassword';
// import expressAsyncHandler from '../utils/core/express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
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
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
	// res.send('successful calling')
	// if (!req.user || !req.user._id) throw new Error('User not found');

	// const user = await UserModel.findById(req.user._id);

	// if (user) {
	// 	user.name = req.body.name || user.name;
	// 	user.email = req.body.email || user.email;
	// 	if (req.body.password) {
	// 		user.password = req.body.password;
	// 	}

	// 	const updatedUser = await user.save();

	// 	res.json({
	// 		_id: updatedUser._id,
	// 		name: updatedUser.name,
	// 		email: updatedUser.email,
	// 		isAdmin: updatedUser.isAdmin,
	// 		token: generateToken(updatedUser._id),
	// 	});
	// } else {
	// 	res.status(404);
	// 	throw new Error('User not found');
	// }

	let toUpdate: boolean = false;
	const userDataToUpdate: {
		name?: string;
		email?: string;
		password?: string;
	} = {};
	if (req.body.name) {
		userDataToUpdate.name = req.body.name;
		if (!toUpdate) toUpdate = true;
	}
	if (req.body.email) {
		userDataToUpdate.email = req.body.email;
		if (!toUpdate) toUpdate = true;
	}
	if (req.body.password) {
		userDataToUpdate.password = await hashPassword(req.body.password);
		if (!toUpdate) toUpdate = true;
	}

	if (!toUpdate) {
		res.status(404);
		throw new Error(`Nothing to update!`);
	}

	const updatedUser = await UserModel.findByIdAndUpdate(
		req.user._id,
		userDataToUpdate,
		{
			new: true,
		}
	);

	if (!updatedUser) {
		res.status(404);
		throw new Error(`User with ${req.user._id} not found.`);
	} else {
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	}
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await UserModel.find({});
	res.json(users);
});

// @desc    Admin delete user with id
// @route   DELETE /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	// const user = await UserModel.findById(req.params.id);
	// // findByIdAndDelete vs findByIdAndRemove

	// if (user) {
	// 	await user.remove();
	// 	res.json({ succuss: true, message: 'user removed' });
	// } else {
	// 	res.status(404);
	// 	throw new Error('User not found');
	// }
	const userDeleted = await UserModel.findByIdAndDelete(req.params.id);
	if (!userDeleted || !userDeleted._id) {
		res.status(404);
		throw new Error('User not found');
	} else res.json({ succuss: true });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await UserModel.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	// const user = await UserModel.findById(req.params.id);

	// if (user) {
	// 	user.name = req.body.name || user.name;
	// 	user.email = req.body.email || user.email;
	// 	user.isAdmin = req.body.isAdmin || user.isAdmin;

	// 	const updatedUser = await user.save();

	// 	res.json({
	// 		_id: updatedUser._id,
	// 		name: updatedUser.name,
	// 		email: updatedUser.email,
	// 		isAdmin: updatedUser.isAdmin,
	// 	});
	// } else {
	// 	res.status(404);
	// 	throw new Error('User not found');
	// }
	let toUpdate: boolean = false;
	const userDataToUpdate: {
		name?: string;
		email?: string;
		isAdmin?: boolean;
	} = {};
	if ('name' in req.body) {
		userDataToUpdate.name = req.body.name;
		if (!toUpdate) toUpdate = true;
	}
	if ('email' in req.body) {
		userDataToUpdate.email = req.body.email;
		if (!toUpdate) toUpdate = true;
	}
	if ('isAdmin' in req.body) {
		userDataToUpdate.isAdmin = req.body.isAdmin;
		if (!toUpdate) toUpdate = true;
	}

	if (!toUpdate) {
		res.status(404);
		throw new Error(`Nothing to update!`);
	}

	const updatedUser = await UserModel.findByIdAndUpdate(
		req.params.id,
		userDataToUpdate,
		{
			new: true,
		}
	);

	if (!updatedUser) {
		res.status(404);
		throw new Error(`User with ${req.params.id} not found.`);
	} else {
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};

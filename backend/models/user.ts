import { Schema, model } from 'mongoose';

interface User {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

const userSchema = new Schema<User>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = model('User', userSchema);

export default UserModel;

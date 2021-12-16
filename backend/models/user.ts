import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}
interface IUserDocument extends IUser, Document {
	matchPassword: (enteredPassword: string) => Promise<boolean>;
}
interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema<IUserDocument> = new Schema(
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

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = model<IUserDocument, IUserModel>('User', userSchema);

export default UserModel;

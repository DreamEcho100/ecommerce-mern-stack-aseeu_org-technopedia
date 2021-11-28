import { hashSync } from 'bcryptjs';
import { config } from 'dotenv';

config();

if (
	typeof process.env.USER_1_PASSWORD !== 'string' ||
	typeof process.env.USER_2_PASSWORD !== 'string' ||
	typeof process.env.USER_3_PASSWORD !== 'string'
) {
	console.log(
		`Error: USER_1_PASSWORD, USER_2_PASSWORD, or USER_3_PASSWORD are not valid strings or not stored in the environment variables.`
	); // .red.underline;
	process.exit(1);
}

const users = [
	{
		name: 'Mazen Mohamed',
		email: 'maze6572198@gmail.com',
		password: hashSync(process.env.USER_1_PASSWORD, 10),
		isAdmin: true,
	},
	{
		name: 'Ahmed Ali',
		email: 'Ahmed@example.com',
		password: hashSync(process.env.USER_2_PASSWORD, 10),
	},
	{
		name: 'Hassan Omar',
		email: 'Hassan@example.com',
		password: hashSync(process.env.USER_3_PASSWORD, 10),
	},
];

export default users;

import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
	if (typeof process.env.JWT_SECRET !== 'string')
		throw new Error("JWT_SECRET doesn't exist in the environment variables.");

	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export default generateToken;

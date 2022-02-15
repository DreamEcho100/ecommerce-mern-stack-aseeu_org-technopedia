import bcrypt from 'bcryptjs';

type THashPassword = (
	password: string,
	options?: {
		saltRounds?: number;
	}
) => Promise<string>;

const hashPassword: THashPassword = async (
	password,
	options = { saltRounds: 10 }
) => {
	const salt = await bcrypt.genSalt(options.saltRounds);

	return await bcrypt.hash(password, salt);
};

export default hashPassword;

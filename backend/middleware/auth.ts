import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user';
import { IUserRequest } from '../general';

interface IJwtPayloadID extends JwtPayload {
	id?: string;
}

const protectMiddleware = asyncHandler(
	async (req: IUserRequest, res: Response, next: NextFunction) => {
		let token: string | undefined;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				token = req.headers.authorization.split(' ')[1];

				if (typeof process.env.JWT_SECRET === 'string') {
					console.log('token', token);
					console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);

					const decoded = jwt.verify(
						token,
						process.env.JWT_SECRET
					) as IJwtPayloadID; // :_(

					if (decoded.id)
						req.user = await User.findById(decoded.id).select('-password');
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error(`Error: ${error.message}`); // .red.underline;
					res.status(500);
					throw new Error(error.message);
				}
				//   .json({
				//   message:
				//     error instanceof Error ? console.error(`Error: ${error.message}`) : '',
				// });
			}
		} /*if(!token)*/ else {
			res.status(401);
			throw new Error('Not authorized');
		}

		next();
	}
);

export { protectMiddleware };

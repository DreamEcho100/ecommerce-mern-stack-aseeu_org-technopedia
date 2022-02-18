import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
// import expressAsyncHandler from '../utils/core/express-async-handler';

import User from '../models/user';
// import { CustomRequest } from '../general';

interface IJwtPayloadID extends JwtPayload {
	id?: string;
}

const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// let token: string | undefined;
		const infoHolder: {
			token?: string;
			message?: string;
			status?: number;
		} = {};

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			if (typeof process.env.JWT_SECRET === 'string') {
				try {
					infoHolder.token = req.headers.authorization.split(' ')[1];

					const decoded = jwt.verify(
						infoHolder.token,
						process.env.JWT_SECRET
					) as IJwtPayloadID; // :_(

					if (decoded.id) {
						const reqUser = await User.findById(decoded.id).select('-password');
						if (reqUser?._id) {
							req.user = reqUser;
						} else {
							res.status(404);
							throw new Error('User Not Found!');
						}
					}
				} catch (error) {
					if (error instanceof Error) {
						infoHolder.message = error.message;
						infoHolder.status = 500;
					}
				}
			} else {
				infoHolder.message =
					"process.env.JWT_SECRET doesn't exist on the server!";
				infoHolder.status = 400;
			}
		}

		if (!infoHolder.token) {
			infoHolder.message = 'Not authorized!';
			infoHolder.status = 401;
		}

		if (infoHolder.status) {
			console.error(infoHolder.message);
			res.status(infoHolder.status);
			throw new Error(infoHolder.message);
		}

		next();
	}
);

const admin = (req: Request, res: Response, next: NextFunction) => {
	console.log('req?.user', req?.user);
	if (req?.user?.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as admin');
	}
};

export { protect as protectMiddleware, admin as adminMiddleware };

import {
	Request,
	// Response,
	// NextFunction
} from 'express';

// export interface IUserRequest extends Request {
// 	user: {
// 		_id: string;
// 	};
// }

declare global {
	namespace Express {
		interface Request {
			user: User; //or other type you would like to use
		}

		export interface IUserRequest extends Request {
			user: {
				_id: string;
			};
		}
	}
}

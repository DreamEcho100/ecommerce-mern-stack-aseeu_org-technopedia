import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			user: {
				_id: string;
			}; //or other type you would like to use
		}
	}
}

export interface CustomRequest extends Request {
	user: {
		_id: string;
	}; //or other type you would like to use
}

export type TDate = Date | number | string;

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

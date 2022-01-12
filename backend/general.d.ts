import { Request, Response, NextFunction } from 'express';

export interface IUserRequest extends Request {
	user?: {
		_id: string;
	};
}

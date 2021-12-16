import express, { Request, Response, NextFunction } from 'express';

const protectMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token;

	console.log(req.headers.authorization);

	next();
};

export { protectMiddleware };

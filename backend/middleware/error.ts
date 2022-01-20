import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const notFoundMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandlerMiddleware = (
	error: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	const isInstanceofError = error instanceof Error;

	res.status(statusCode);
	res.json({
		message: isInstanceofError ? error.message : 'Something went wrong',
		stack:
			process.env.NODE_ENV === 'production'
				? null
				: isInstanceofError
				? error.stack
				: 'Something went wrong',
	});
};

export { notFoundMiddleware, errorHandlerMiddleware };

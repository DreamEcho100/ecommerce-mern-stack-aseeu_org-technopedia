import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
	// const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(new Error(`Not Found - ${req.originalUrl}`));
};

const errorHandler = (
	error: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode =
		res.statusCode > 199 && res.statusCode < 300 ? 500 : res.statusCode;

	const isInstanceofError = error instanceof Error;

	res.status(statusCode).json({
		message: isInstanceofError ? error.message : 'Something went wrong',
		stack:
			process.env.NODE_ENV === 'production'
				? null
				: isInstanceofError
				? error.stack
				: 'Something went wrong',
	});
};

export {
	notFound as notFoundMiddleware,
	errorHandler as errorHandlerMiddleware,
};

// Credit to: [Abazhenov/express-async-handler](https://github.com/Abazhenov/express-async-handler)

import express from 'express';
import core from 'express-serve-static-core';

/*
declare function expressAsyncHandler<
	P = core.ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = core.Query
>(
	handler: (
		...args: Parameters<express.RequestHandler<P, ResBody, ReqBody, ReqQuery>>
	) => void | Promise<void>
): express.RequestHandler<P, ResBody, ReqBody, ReqQuery>;

declare namespace expressAsyncHandler {}

export = expressAsyncHandler;
*/

// type asyncUtilWrap = ;
type TArgs = Parameters<
	express.RequestHandler<core.ParamsDictionary, any, any, core.Query>
>;

type TFn = (...args: TArgs) => void | Promise<void>;

type TExpressAsyncHandler = (
	fn: TFn
) => (...args: TArgs) => void | Promise<void>;

const expressAsyncHandler: TExpressAsyncHandler =
	(fn) =>
	// expressAsyncHandlerWrap
	(...args) => {
		const fnReturn = fn(...args);
		const next = args[args.length - 1];
		return Promise.resolve(fnReturn).catch(next as core.NextFunction);
	};

export default expressAsyncHandler;

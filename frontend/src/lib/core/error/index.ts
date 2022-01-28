import { IErrorObject } from './ts';

export const handleActionThrowError = <T>(data: T) => {
	throw new Error(
		(() => {
			const errorObject: IErrorObject =
				typeof data === 'object' && 'message' in data
					? (data as unknown as IErrorObject)
					: { message: data as unknown as IErrorObject['message'] };

			return errorObject.message;
		})()
	);
};

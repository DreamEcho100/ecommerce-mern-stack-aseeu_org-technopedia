import path from 'path';
import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
interface IRequestWithFile extends Request {
	file?: Express.Multer.File;
}

const UploadRouter = express.Router();

const storage = multer.diskStorage({
	destination(
		req: Request,
		file: Express.Multer.File,
		callback: DestinationCallback
	) {
		callback(null, 'uploads/images');
	},
	filename(
		req: Request,
		file: Express.Multer.File,
		callback: FileNameCallback
	) {
		callback(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const checkFileType = (
	file: Express.Multer.File,
	callback: FileFilterCallback
) => {
	const filetypes = /(jpg|jpeg|png|webp|avif)$/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return callback(null, true);
	} else {
		callback(new Error('Images only!'));
	}
};

const upload = multer({
	storage,
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		callback: FileFilterCallback
	) => {
		checkFileType(file, callback);
	},
});

UploadRouter.post(
	'/image',
	upload.single('image'),
	(req: IRequestWithFile, res: Response) => {
		if (req.file) res.send(`/${req.file.path.replace(/\\/g, '/')}`);
		else throw new Error("Couldn't find the file!");
	}
);

export default UploadRouter;

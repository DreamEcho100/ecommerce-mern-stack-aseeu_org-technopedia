import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import colors from 'colors';
import { config } from 'dotenv';

import connectDB from './config/db';
import productRoutes from './routes/api/v1/productRoutes';

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
	origin: process.env.FRONT_END_ROOT_URL,
	methods: 'GET', // PUT,PATCH,POST,DELETE,HEAD,
	// optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running!');
});

app.use('/api/v1/products', productRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	/* if (error instanceof Error) */ res.json(error.message);
});

app.listen(
	PORT,
	() =>
		console.log(
			`Server is running on ${process.env.NODE_ENV} mode port ${PORT}`
		) // .yellow.bold
);

import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
// import colors from 'colors';
import { config } from 'dotenv';

import connectDB from './config/db';
import { errorHandlerMiddleware, notFoundMiddleware } from './middleware/error';
import productsRoutes from './routes/products';
import usersRoutes from './routes/users';
import ordersRoutes from './routes/orders';
import uploadRoutes from './routes/upload';

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('process.env.FRONT_END_ROOT_URL', process.env.FRONT_END_ROOT_URL);

const corsOptions = {
	origin: [
		process.env.FRONT_END_ROOT_URL || 'http://localhost:3000',
		'http://localhost:5000',
	],
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/api/config/paypal', (req: Request, res: Response) => {
	res.json(process.env.PAYPAL_CLIENT_ID);
});

app.use(
	'/uploads/images',
	express.static(path.join(process.cwd(), '/uploads/images'))
);

// const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), '/frontend/build')));

	app.get('*', (req: Request, res: Response) => {
		res.sendFile(
			path.resolve(process.cwd(), 'frontend', 'build', 'index.html')
		);
	});
} else {
	app.get('/', (req: Request, res: Response) => {
		res.send('API is running!');
	});
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(
	PORT,
	() =>
		console.log(
			`Server is running on ${process.env.NODE_ENV} mode port ${PORT}`
		) // .yellow.bold
);

import express, { Request, Response } from 'express';
import cors from 'cors';
// import colors from 'colors';
import { config } from 'dotenv';

import connectDB from './config/db';
import { errorHandlerMiddleware, notFoundMiddleware } from './middleware/error';
import productsRoutes from './routes/products';
import usersRoutes from './routes/users';
import orderRoutes from './routes/order';

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
	origin: process.env.FRONT_END_ROOT_URL,
	methods: 'GET,POST,PUT', // PUT,PATCH,POST,DELETE,HEAD,
	// optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('API is running!');
});

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(
	PORT,
	() =>
		console.log(
			`Server is running on ${process.env.NODE_ENV} mode port ${PORT}`
		) // .yellow.bold
);

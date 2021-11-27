import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import products from './data/products';

config();

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

app.get('/api/v1/products', (req, res) => {
	return res.json(products);
});

app.get('/api/v1/products/:id', (req, res) => {
	const product = products.find((item) => item._id === req.params.id);

	if (!product)
		return res.status(404).json({ message: "Product isn't found!" });

	return res.json(product);
});

app.listen(PORT, () =>
	console.log(`Server is running on ${process.env.NODE_ENV} mode port ${PORT}`)
);

import express from 'express';
import products from './data/products';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
	res.send('API is running....');
});

app.get('/api/v1/products', (req, res) => {
	res.json(products);
});

app.get('/api/v1/products/:id', (req, res) => {
	const product = products.filter((item) => item._id === req.params.id);

	res.json(product);
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

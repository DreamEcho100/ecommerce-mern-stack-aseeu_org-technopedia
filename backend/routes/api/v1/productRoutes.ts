import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import Product from '../../../models/productModel';

router.get(
	'/',
	asyncHandler(async (req, res) => {
		try {
			const products = await Product.find({});
			res.json(products);
		} catch (error) {
			if (error instanceof Error) console.error(`Error: ${error.message}`); // .red.underline;
			res.status(404).json({
				message:
					error instanceof Error
						? console.error(`Error: ${error.message}`)
						: '',
			});
		}
	})
);

router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		try {
			const product = await Product.findById(req.params.id);

			if (product) {
				res.json(product);
			} else {
				res.status(404).json({ message: 'product not found' });
			}
		} catch (error) {
			if (error instanceof Error) console.error(`Error: ${error.message}`); // .red.underline;
			res.status(404).json({
				message:
					error instanceof Error
						? console.error(`Error: ${error.message}`)
						: '',
			});
		}
	})
);

export default router;

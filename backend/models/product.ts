import { Schema, model } from 'mongoose';

interface Review {
	name: string;
	rating: number;
	comment: string;
}

interface Product {
	user: typeof Schema.Types.ObjectId;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	reviews: Review;
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
}

const reviewSchema = new Schema<Review>(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const productSchema = new Schema<Product>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const ProductModel = model('Product', productSchema);

export default ProductModel;

import { Schema, Document, Model, model } from 'mongoose';

interface IReview {
	name: string;
	rating: number;
	comment: string;
}

interface IProduct {
	user: typeof Schema.Types.ObjectId;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	reviews: IReview;
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
}
interface IProductDocument extends IProduct, Document {}
interface IProductModel extends Model<IProductDocument> {}

const reviewSchema = new Schema<IReview>(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const productSchema: Schema<IProductDocument> = new Schema<IProduct>(
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

const ProductModel = model<IProductDocument, IProductModel>(
	'Product',
	productSchema
);

export default ProductModel;

// import mongoose from '../node_modules/mongoose';
import { config } from 'dotenv';
// import colors from 'colors'

import users from './data/users';
import products from './data/products';

import UserModel from './models/user';
import ProductModel from './models/product';
import OrderModel from './models/order';
import connectDB from './config/db';

config();

connectDB();

const importData = async () => {
	try {
		await OrderModel.deleteMany();
		await ProductModel.deleteMany();
		await UserModel.deleteMany();

		const createdUser = await UserModel.insertMany(users);

		const adminUser = createdUser[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await ProductModel.insertMany(sampleProducts);

		console.log('Data imported'); // .green
		process.exit();
	} catch (error) {
		if (error instanceof Error) console.error(`${error.message}`); // .red
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await OrderModel.deleteMany();
		await ProductModel.deleteMany();
		await UserModel.deleteMany();

		console.log('Data destroyed'); // .red
		process.exit();
	} catch (error) {
		if (error instanceof Error) console.error(`${error.message}`); // .red
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}

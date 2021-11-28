// import mongoose from '../node_modules/mongoose';
import { config } from 'dotenv';
// import colors from 'colors'

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUser = await User.insertMany(users);

		const adminUser = createdUser[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log('Data imported'); // .green
		process.exit();
	} catch (error) {
		if (error instanceof Error) console.error(`${error.message}`); // .red
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

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

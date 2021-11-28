import { ConnectOptions, connect } from 'mongoose';
import { config } from 'dotenv';

config();

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

const connectDB = async () => {
	try {
		if (typeof MONGODB_CONNECTION_URL !== 'string')
			throw new Error('Invalid Connection String!');
		const conn = await connect(MONGODB_CONNECTION_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		} as ConnectOptions);

		console.log(`MongoDB connected: ${conn.connection.host}`); // .cyan.underline;
	} catch (error) {
		if (error instanceof Error) console.error(`Error: ${error.message}`); // .red.underline;
		process.exit(1);
	}
};

export default connectDB;

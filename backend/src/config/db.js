import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import mongoose from 'mongoose';
import { DB_name } from '../constants.js';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_name}`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('ERROR', error);
    process.exit(1);
  }
};
export default connectDb;



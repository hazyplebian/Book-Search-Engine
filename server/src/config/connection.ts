import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hazyplebian:udt2p35Bx2ck%40B5@cluster0.pnai1a3.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0';
console.log('MONGODB_URI:', MONGODB_URI);
const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};
export default db;
import mongoose, { Mongoose } from 'mongoose';

const connectDB = (url: string): Promise<Mongoose> => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(url);
};

export default connectDB;

import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  email: string;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      maxLength: 20,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  UserSchema
);

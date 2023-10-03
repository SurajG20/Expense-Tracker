import mongoose, { Document, Model, Schema } from 'mongoose';

interface IncomeAttributes {
  title: string;
  amount: number;
  type?: string;
  date: Date;
  category: string;
  description: string;
  user: Schema.Types.ObjectId; // Add user field to store the user's ID
}

interface IncomeDocument extends Document, IncomeAttributes {
  createdAt: Date;
  updatedAt: Date;
}

interface IncomeModel extends Model<IncomeDocument> {}

const IncomeSchema = new mongoose.Schema<IncomeDocument, IncomeModel>(
  {
    title: {
      type: String,
      maxLength: 50,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      maxLength: 20,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      default: 'income',
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  },
  { timestamps: true }
);

const IncomeModel = mongoose.model<IncomeDocument, IncomeModel>(
  'Income',
  IncomeSchema
);

export { IncomeDocument, IncomeModel };

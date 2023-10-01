import mongoose, { Document, Model } from 'mongoose';

interface ExpenseAttributes {
  title: string;
  amount: number;
  type?: string;
  date: Date;
  category: string;
  description: string;
}

interface ExpenseDocument extends Document, ExpenseAttributes {
  createdAt: Date;
  updatedAt: Date;
}

interface ExpenseModel extends Model<ExpenseDocument> {}

const ExpenseSchema = new mongoose.Schema<ExpenseDocument, ExpenseModel>(
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
      default: 'expense',
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
  },
  { timestamps: true }
);

const ExpenseModel = mongoose.model<ExpenseDocument, ExpenseModel>(
  'expense',
  ExpenseSchema
);

export { ExpenseDocument, ExpenseModel };

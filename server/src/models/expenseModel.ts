import { InferSchemaType, model, Schema } from 'mongoose';

const ExpenseSchema = new Schema(
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
    user: {
      type: String,
    },
  },
  { timestamps: true }
);
type Expense = InferSchemaType<typeof ExpenseSchema>;

export default model<Expense>('Expense', ExpenseSchema);

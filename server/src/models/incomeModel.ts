import { InferSchemaType, model, Schema } from 'mongoose';

const IncomeSchema = new Schema(
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
      type: String,
    },
  },
  { timestamps: true }
);

type Income = InferSchemaType<typeof IncomeSchema>;

export default model<Income>('Income', IncomeSchema);

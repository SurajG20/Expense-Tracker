const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
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
      default: "expense",
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

const ExpenseModel = mongoose.model("expense", ExpenseSchema);

module.exports = ExpenseModel;

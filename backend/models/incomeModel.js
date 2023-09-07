const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
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
      default: "income",
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

const IncomeModel = mongoose.model("Income", IncomeSchema);

module.exports = IncomeModel;

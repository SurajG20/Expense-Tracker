const ExpenseModel = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, date, category, description } = req.body;
  const expense = ExpenseModel({ title, amount, date, category, description });
  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "expense Added" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseModel.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

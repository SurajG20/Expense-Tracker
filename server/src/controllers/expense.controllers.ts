import { Request, Response } from 'express';
import ExpenseModel from '../models/expenseModel';

export const addExpense = async (req: Request, res: Response) => {
  const { title, amount, date, category, description } = req.body;
  const userId = req.user.userId;
  const expense = new ExpenseModel({
    title,
    amount,
    date,
    category,
    description,
    user: userId,
  });
  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (typeof Number(amount) !== 'number' || amount <= 0) {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive number!' });
    }
    await expense.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  try {
    const expenses = await ExpenseModel.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const expense = await ExpenseModel.findByIdAndDelete({
      _id: id,
      user: userId,
    });
    if (expense) {
      res.status(200).json({ message: 'Expense Deleted' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

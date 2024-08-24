import { Request, Response } from 'express';
import IncomeModel from '../models/incomeModel';

export const addIncome = async (req: Request, res: Response) => {
  const { title, amount, date, category, description } = req.body;
  const userId = req.user.userId;
  const income = new IncomeModel({
    title,
    amount,
    date,
    category,
    description,
    user: userId
  });
  try {
    if (!title || !category || !description || !date || !amount) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    await income.save();
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getIncome = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.userId;
  try {
    const incomes = await IncomeModel.find({
      user: userId
    }).sort({
      createdAt: -1
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteIncome = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const income = await IncomeModel.findByIdAndDelete({
      _id: id,
      user: userId
    });
    if (income) {
      res.status(200).json({ message: 'Income Deleted' });
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

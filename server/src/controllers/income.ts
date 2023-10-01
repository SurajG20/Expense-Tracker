import { Request, Response } from 'express';
import { IncomeModel, IncomeDocument } from '../models/incomeModel';

export const addIncome = async (req: Request, res: Response) => {
  const { title, amount, date, category, description } = req.body;
  const income: IncomeDocument = new IncomeModel({
    title,
    amount,
    date,
    category,
    description,
  });
  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive number!' });
    }
    await income.save();
    res.status(200).json({ message: 'Income Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const incomes: IncomeDocument[] = await IncomeModel.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ incomes });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteIncome = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const income: IncomeDocument | null = await IncomeModel.findByIdAndDelete(
      id
    );
    if (income) {
      res.status(200).json({ message: 'Income Deleted' });
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

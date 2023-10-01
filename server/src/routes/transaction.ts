import { Router } from 'express';
import { addIncome, deleteIncome, getIncome } from '../controllers/income';
import { addExpense, deleteExpense, getExpense } from '../controllers/expense';

const router = Router();

router
  .post('/add-income', addIncome)
  .delete('/delete-income/:id', deleteIncome)
  .get('/get-incomes', getIncome)
  .post('/add-expense', addExpense)
  .delete('/delete-expense/:id', deleteExpense)
  .get('/get-expenses', getExpense);

export default router;

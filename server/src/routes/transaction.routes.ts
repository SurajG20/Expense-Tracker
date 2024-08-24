import { Router } from 'express';
import {
  addIncome,
  deleteIncome,
  getIncome,
} from '../controllers/income.controllers';
import {
  addExpense,
  deleteExpense,
  getExpense,
} from '../controllers/expense.controllers';
import { verifyToken } from '../middlewares/verifyToken';
const router = Router();

router
  .post('/add-income', verifyToken as any, addIncome)
  .delete('/delete-income/:id', verifyToken as any, deleteIncome)
  .get('/get-incomes', verifyToken as any, getIncome)
  .post('/add-expense', verifyToken as any, addExpense)
  .delete('/delete-expense/:id', verifyToken as any, deleteExpense)
  .get('/get-expenses', verifyToken as any, getExpense);

export default router;

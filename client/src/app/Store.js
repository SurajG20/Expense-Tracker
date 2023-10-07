import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from '../features/incomes/incomeSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import userReducer from '../features/users/userSlice';

export const Store = configureStore({
  reducer: {
    incomes: incomeReducer,
    expenses: expenseReducer,
    users: userReducer,
  },
});

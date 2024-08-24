import { combineReducers, configureStore } from '@reduxjs/toolkit';

import incomeReducer from '../features/incomes/incomeSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import { authApi } from '../features/users/userSlice';

const appReducer = combineReducers({
  incomes: incomeReducer,
  expenses: expenseReducer,
  [authApi.reducerPath]: authApi.reducer
});

const Store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export default Store;

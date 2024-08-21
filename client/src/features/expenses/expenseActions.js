import { userRequest } from '../../utils/requestMethods';
import {
  getExpensesStart,
  getExpensesSuccess,
  getExpensesFailure,
  deleteExpensesStart,
  deleteExpensesFailure,
  deleteExpensesSuccess,
  addExpensesStart,
  addExpensesSuccess,
  addExpensesFailure
} from './expenseSlice';

export const getExpense = async (dispatch) => {
  dispatch(getExpensesStart());
  try {
    const res = await userRequest.get('/get-expenses');
    const expenses = res.data.map((expense) => ({
      ...expense,
      date: new Date(expense.date).toISOString()
    }));

    dispatch(getExpensesSuccess(expenses));
  } catch (error) {
    dispatch(getExpensesFailure());
  }
};

export const deleteExpense = async (dispatch, id) => {
  dispatch(deleteExpensesStart());
  try {
    await userRequest.delete('/delete-expense/' + id);
    dispatch(deleteExpensesSuccess({ id }));
  } catch (error) {
    dispatch(deleteExpensesFailure());
  }
};

export const addExpense = async (dispatch, data) => {
  dispatch(addExpensesStart());
  try {
    const formattedData = {
      ...data,
      date: new Date(data.date).toISOString()
    };
    const Response = await userRequest.post('/add-expense/', formattedData);
    dispatch(addExpensesSuccess(Response.data));
  } catch (error) {
    dispatch(addExpensesFailure());
  }
};

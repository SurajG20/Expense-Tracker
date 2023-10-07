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
  addExpensesFailure,
} from './expenseSlice';

export const getExpense = async (dispatch) => {
  dispatch(getExpensesStart());
  try {
    const res = await userRequest.get('/get-expenses');
    dispatch(getExpensesSuccess(res.data));
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
    await userRequest.post('/add-expense/', data);
    dispatch(addExpensesSuccess(data));
  } catch (error) {
    dispatch(addExpensesFailure());
  }
};

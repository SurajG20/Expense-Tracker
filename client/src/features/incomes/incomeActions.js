import { userRequest } from '../../utils/requestMethods';

import {
  getIncomesStart,
  getIncomesSuccess,
  getIncomesFailure,
  deleteIncomesStart,
  deleteIncomesFailure,
  deleteIncomesSuccess,
  addIncomesStart,
  addIncomesSuccess,
  addIncomesFailure
} from './incomeSlice';

export const getIncomes = async (dispatch) => {
  dispatch(getIncomesStart());
  try {
    const res = await userRequest.get('/get-incomes');
    const incomes = res.data.map((income) => ({
      ...income,
      date: new Date(income.date).toISOString()
    }));
    dispatch(getIncomesSuccess(incomes));
  } catch (error) {
    dispatch(getIncomesFailure());
  }
};

export const deleteIncome = async (dispatch, id) => {
  dispatch(deleteIncomesStart());
  try {
    await userRequest.delete('/delete-income/' + id);
    dispatch(deleteIncomesSuccess({ id }));
  } catch (error) {
    dispatch(deleteIncomesFailure());
  }
};

export const addIncome = async (dispatch, data) => {
  dispatch(addIncomesStart());
  try {
    const formattedData = {
      ...data,
      date: new Date(data.date).toISOString()
    };
    const Response = await userRequest.post('/add-income/', formattedData);
    dispatch(addIncomesSuccess(Response.data));
  } catch (error) {
    dispatch(addIncomesFailure());
  }
};

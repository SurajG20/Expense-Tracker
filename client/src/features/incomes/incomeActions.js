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
  addIncomesFailure,
} from './incomeSlice';

export const getIncomes = async (dispatch) => {
  dispatch(getIncomesStart());
  try {
    const res = await userRequest.get('/get-incomes');
    dispatch(getIncomesSuccess(res.data));
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
    await userRequest.post('/add-income/', data);
    dispatch(addIncomesSuccess(data));
  } catch (error) {
    dispatch(addIncomesFailure());
  }
};

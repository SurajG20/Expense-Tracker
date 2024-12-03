import { userRequest } from "../../utils/requestMethods";
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
} from "./expenseSlice";

export const getExpense = async (dispatch) => {
  dispatch(getExpensesStart());
  try {
    const res = await userRequest.get("/finance?type=expense");
    if (res.data.success) {
      dispatch(getExpensesSuccess(res.data.result));
    }
  } catch (error) {
    dispatch(getExpensesFailure());
  }
};

export const deleteExpense = async (dispatch, id) => {
  dispatch(deleteExpensesStart());
  try {
    await userRequest.delete("/delete-expense/" + id);
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
      date: new Date(data.date).toISOString(),
    };
    const Response = await userRequest.post("/add-expense/", formattedData);
    dispatch(addExpensesSuccess(Response.data));
  } catch (error) {
    dispatch(addExpensesFailure());
  }
};

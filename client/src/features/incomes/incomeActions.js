import { userRequest } from "../../utils/requestMethods";

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
} from "./incomeSlice";

export const getIncomes = async (dispatch) => {
  dispatch(getIncomesStart());
  try {
    const res = await userRequest.get("/finance?type=income");
    if (res.data.success) {
      dispatch(getIncomesSuccess(res.data.result));
    }
  } catch (error) {
    dispatch(getIncomesFailure());
  }
};

export const deleteIncome = async (dispatch, id) => {
  dispatch(deleteIncomesStart());
  try {
    await userRequest.delete("/delete-income/" + id);
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
      date: new Date(data.date).toISOString(),
    };
    const Response = await userRequest.post("/add-income/", formattedData);
    dispatch(addIncomesSuccess(Response.data));
  } catch (error) {
    dispatch(addIncomesFailure());
  }
};

import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getExpensesSuccess: (state, action) => {
      state.isFetching = false;
      state.expenses = action.payload;
    },
    getExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteExpensesSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.expenses.findIndex(
        (i) => i._id === action.payload.id
      );
      if (index !== -1) {
        state.expenses.splice(index, 1);
      }
    },
    deleteExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addExpensesSuccess: (state, action) => {
      state.isFetching = false;
      state.expenses.push(action.payload);
    },
    addExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getExpensesStart,
  getExpensesSuccess,
  getExpensesFailure,
  deleteExpensesFailure,
  deleteExpensesSuccess,
  deleteExpensesStart,
  addExpensesFailure,
  addExpensesStart,
  addExpensesSuccess,
} = expenseSlice.actions;
export default expenseSlice.reducer;

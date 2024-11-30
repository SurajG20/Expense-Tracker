import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getIncomesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getIncomesSuccess: (state, action) => {
      state.isFetching = false;
      state.incomes = action.payload;
    },
    getIncomesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteIncomesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteIncomesSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.incomes.findIndex((i) => i._id === action.payload.id);
      if (index !== -1) {
        state.incomes.splice(index, 1);
      }
    },
    deleteIncomesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addIncomesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addIncomesSuccess: (state, action) => {
      state.isFetching = false;
      state.incomes.push(action.payload);
    },
    addIncomesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getIncomesStart,
  getIncomesSuccess,
  getIncomesFailure,
  deleteIncomesFailure,
  deleteIncomesSuccess,
  deleteIncomesStart,
  addIncomesFailure,
  addIncomesStart,
  addIncomesSuccess,
} = incomeSlice.actions;
export default incomeSlice.reducer;

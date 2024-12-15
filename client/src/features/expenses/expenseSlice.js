import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../utils/requestMethods";
import { toast } from "react-toastify";

const initialState = {
  expenses: [],
  isFetching: false,
  error: null,
};

export const getExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async (_, { rejectWithValue }) => {
    const res = await userRequest.get("/finance?type=expense");
    if (res.data.success === "true") {
      return res.data.result;
    } else if (res.data.success === "false") {
      toast.error(res.data.message || "Failed to fetch expenses");
      return rejectWithValue(res.data.message || "Failed to fetch expenses");
    } else {
      toast.error(res.data.message || "Unauthorized");
      window.location.href = "/login";
      return rejectWithValue("Authentication required");
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, { rejectWithValue }) => {
    const res = await userRequest.delete(`/finance/${id}`);
    if (res.data.success === "true") {
      toast.success("Expense deleted successfully");
      return id;
    } else if (res.data.success === "false") {
      toast.error(res.data.message || "Failed to delete expense");
      return rejectWithValue(res.data.message || "Failed to delete expense");
    } else if (res.data.success === "invalid") {
      const errors = res.data.result;
      toast.error(errors?.[0].message || "Failed to delete expense");
      return rejectWithValue(res.data.result || "Invalid data");
    } else {
      toast.error(res.data.message || "Unauthorized");
      window.location.href = "/login";
      return rejectWithValue("Authentication required");
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (data, { rejectWithValue }) => {
    const formattedData = {
      ...data,
      date: new Date(data.date).toISOString(),
    };
    const res = await userRequest.post("/finance/", formattedData);
    if (res.data.success === "true") {
      toast.success("Expense added successfully");
      return res.data.result;
    } else if (res.data.success === "false") {
      toast.error(res.data.message || "Failed to add expense");
      return rejectWithValue(res.data.message || "Failed to add expense");
    } else if (res.data.success == "invalid") {
      const errors = res.data.result;
      toast.error(errors?.[0].message || "Failed to add expense");
      return rejectWithValue(res.data.result || "Invalid data");
    } else {
      toast.error(res.data.message || "Unauthorized");
      window.location.href = "/login";
      return rejectWithValue("Authentication required");
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenses.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      state.isFetching = false;
      state.expenses = action.payload;
    });
    builder.addCase(getExpenses.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });

    builder.addCase(deleteExpense.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.isFetching = false;
      state.expenses = state.expenses.filter(
        (expense) => expense._id !== action.payload
      );
    });
    builder.addCase(deleteExpense.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });

    builder.addCase(addExpense.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.isFetching = false;
      state.expensses.push(action.payload);
    });
    builder.addCase(addExpense.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

export default expenseSlice.reducer;

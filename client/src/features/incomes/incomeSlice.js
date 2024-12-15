import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../utils/requestMethods";
import { toast } from "react-toastify";

const initialState = {
  incomes: [],
  isFetching: false,
  error: null,
};

export const getIncomes = createAsyncThunk(
  "income/getIncomes",
  async (_, { rejectWithValue }) => {
    const res = await userRequest.get("/finance?type=income");

    if (res.data.success === "true") {
      return res.data.result;
    } else if (res.data.success === "false") {
      toast.error(res.data.message || "Failed to fetch incomes");
      return rejectWithValue(res.data.message || "Failed to fetch incomes");
    } else {
      toast.error(res.data.message || "Unauthorized");
      window.location.href = "/login";
      return rejectWithValue("Authentication required");
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id, { rejectWithValue }) => {
    const res = await userRequest.delete(`/finance/${id}`);

    if (res.data.success === "true") {
      toast.success("Income deleted successfully");
      return id;
    } else if (res.data.success === "false") {
      toast.error(res.data.message || "Failed to delete income");
      return rejectWithValue(res.data.message || "Failed to delete income");
    } else if (res.data.success === "invalid") {
      const errors = res.data.result;
      toast.error(errors?.[0].message || "Failed to delete income");
      return rejectWithValue(res.data.result || "Invalid data");
    } else {
      toast.error(res.data.message || "Unauthorized");
      window.location.href = "/login";
      return rejectWithValue("Authentication required");
    }
  }
);

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (data, { rejectWithValue }) => {
    const formattedData = {
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
    };
    const res = await userRequest.post("/finance", formattedData);
    if (res.data.success == "true") {
      toast.success("Income added successfully");
      return res.data.result;
    } else if (res.data.success == "false") {
      toast.error(res.data.message || "Failed to add income");
      return rejectWithValue(res.data.message || "Failed to add income");
    } else if (res.data.success == "invalid") {
      const errors = res.data.result;
      toast.error(errors?.[0].message || "Failed to add income");
      return rejectWithValue(res.data.result || "Invalid data");
    } else {
      toast.error(res.data.message || "Unauthorized");
      window.location.href = "/login";
      return rejectWithValue("Authentication required");
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncomes.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getIncomes.fulfilled, (state, action) => {
      state.isFetching = false;
      state.incomes = action.payload;
    });
    builder.addCase(getIncomes.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });

    builder.addCase(deleteIncome.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteIncome.fulfilled, (state, action) => {
      state.isFetching = false;
      state.incomes = state.incomes.filter(
        (income) => income._id !== action.payload
      );
    });
    builder.addCase(deleteIncome.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });

    builder.addCase(addIncome.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(addIncome.fulfilled, (state, action) => {
      state.isFetching = false;
      state.incomes.push(action.payload);
    });
    builder.addCase(addIncome.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

export default incomeSlice.reducer;

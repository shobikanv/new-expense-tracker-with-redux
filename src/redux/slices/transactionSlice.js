import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/api-client";

const initialState = {
  id: null,
  transactionList: [],
};
export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (params) => {
    let url = "/transactions";

    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const response = await Api.get(url);
    return response;
  }
);


export const addTransactions = createAsyncThunk(
  "transaction/addTransactions",
  async ({ params }) => {
    const response = await Api.post(`/transactions/`, params);
    return response;
  }
);

export const editTransactions = createAsyncThunk(
  "transaction/editTransactions",
  async ({ id, params }) => {
    const response = await Api.put(`/transactions/${id}/`, params);
    return response;
  }
);

export const deleteTransactions = createAsyncThunk(
  "transaction/deleteTransactions",
  async ({ id }) => {
    const response = await Api.delete(`/transactions/${id}/`);
    return response;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
      state.transactionList = payload || [];
    });
  },
});

export const getTransactionValues = (state) => state.transactions;

export default transactionSlice.reducer;

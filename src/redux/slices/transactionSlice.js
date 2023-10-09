import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/api-client";

const initialState = {
  id: null,
  transactionList: [],
  
};

export const getTransactions = createAsyncThunk("transaction/getTransactions", async () => {
  const response = await Api.get(`/transactions/`);
  return response;
});

export const addTransactions = createAsyncThunk("transaction/addTransactions",async ({ params }) => {
    const response = await Api.post(`/transactions/`, params);
    return response;
  }
);

export const editAccount = createAsyncThunk("account/editAccount",async ({id, params }) => {
  const response = await Api.put(`/accounts/${id}/`, params);
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

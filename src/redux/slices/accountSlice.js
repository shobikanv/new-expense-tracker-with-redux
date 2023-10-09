import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/api-client";

const initialState = {
  id: null,
  accountList: [],
};

export const getAccounts = createAsyncThunk("account/getAccounts", async () => {
  const response = await Api.get(`/accounts/`);
  return response;
});

export const addAccount = createAsyncThunk("account/addAccount",async ({ params }) => {
    const response = await Api.post(`/accounts/`, params);
    return response;
  }
);

export const editAccount = createAsyncThunk("account/editAccount",async ({id, params }) => {
  const response = await Api.put(`/accounts/${id}/`, params);
  return response;
}
);

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
      state.accountList = payload || [];
    });
  },
});

export const getAccountValues = (state) => state.accounts;

export default accountSlice.reducer;

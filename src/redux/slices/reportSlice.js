import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/api-client";

const initialState = {
  id: null,
  reports: [],
};

export const getReports = createAsyncThunk(
  "report/getReports",
  async ({ params }) => {
    const queryParams = new URLSearchParams(params).toString();

    const response = await Api.get(`/reports/?${queryParams}`);
    return response;
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReports.fulfilled, (state, { payload }) => {
      state.reports = payload || [];
    });
  },
});

export const getReportValues = (state) => state.reports;

export default reportSlice.reducer;

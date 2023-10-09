import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/api-client";

const initialState = {
  id: null,
  tagList: [],
};

export const getTags = createAsyncThunk("tag/getTags", async () => {
  const response = await Api.get(`/tags/`);
  return response;
});

export const addTags = createAsyncThunk("tag/addTags", async ({ params }) => {
  const response = await Api.post(`/tags/`, params);
  return response;
});

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.fulfilled, (state, { payload }) => {
      state.tagList = payload || [];
    });
  },
});

export const getTagValues = (state) => state.tags;

export default tagSlice.reducer;

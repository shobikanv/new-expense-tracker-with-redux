import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import transactionReducer from "./slices/transactionSlice";
import tagsReducer from "./slices/tagSlice";
import reportsReducer from "./slices/reportSlice"

export const rootReducer = combineReducers({
  accounts: accountReducer,
  transactions: transactionReducer,
  tags: tagsReducer,
  reports:reportsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

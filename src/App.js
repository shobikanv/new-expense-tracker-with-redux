import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import SidebarMenu from "./components/SidebarMenu";
import Layout from "./pages/Layout/Layout";
import AddAccount from "./components/Accounts/AccountForm";
import ListAccounts from "./components/Accounts/ListAccounts/List";
import Dashboard from "./pages/DashBoard";
import AccountItem from "./components/Accounts/ListAccounts/Items";
import Accounts from "./pages/Accounts";
import TransactionForm from "./components/Transactions/Form/TransactionForm";
import TransactionList from "./components/Transactions/List/TransactionList";
import Transactions from "./pages/Transactions";

function App() {
  const routes = (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/accounts" exact element={<Accounts />} />
      <Route path="/transactions" exact element={<Transactions />} />
    </Routes>
  );

  return (
    <div className="App">
      <Router>{routes}</Router>
    </div>
  );
}

export default App;

// import React, { useCallback, useEffect } from "react";
// import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAccounts,
//   getAccountValues,
//   addAccount,
// } from "./redux/slices/accountSlice";

// function App() {
//   const dispatch = useDispatch();
//   const { accountList } = useSelector(getAccountValues);

//   const initialMasters = async () => {
//     const values = {
//       name: "apicall",
//       group: "BANK_ACCOUNT",
//       balance: "25000.00",
//     };
//     await dispatch(addAccount({ params: values }));
//     if (accountList && accountList.length === 0) {
//       await dispatch(getAccounts());
//     }
//   };

//   useEffect(() => {
//     initialMasters();
//   }, []);

//   console.log("accountList", accountList);

//   return <h1>Hello World</h1>;
// }

// export default App;

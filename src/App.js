import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  const routes = (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/accounts" exact element={<Accounts />} />
      <Route path="/transactions" exact element={<Transactions />} />
      <Route path="/reports" exact element={<Reports />} />
      <Route path="/settings" exact element={<Settings/>}/>
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

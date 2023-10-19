import React from "react";
import Layout from "./Layout/Layout";

import Header from "../components/Reports/Header";
import UserImport from "../components/Settings/UserImport";
import CurrencyExchange from "../components/Settings/CurrencyExchange";

const Settings = () => {
  return (
    <Layout>
      <div className="container-full-page mt-settings">
        <CurrencyExchange/>
        <UserImport/>
      </div>
    </Layout>
  );
};

export default Settings;

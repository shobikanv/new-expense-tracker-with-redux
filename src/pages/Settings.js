import React from "react";
import Layout from "./Layout/Layout";
import UserImport from "../components/Settings/UserImport";
import CurrencyExchange from "../components/Settings/CurrencyExchange";
import CollapsibleSection from "../components/Collapsible/Collapsible";
const Settings = () => {
  return (
    <Layout>
      <div className="container-full-page mt-settings">
      <CollapsibleSection name="currency" label="Currency">
        <CurrencyExchange/>
        </CollapsibleSection>
        <UserImport/>
      </div>
    </Layout>
  );
};

export default Settings;

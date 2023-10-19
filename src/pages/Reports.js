import React from "react";
import Layout from "./Layout/Layout";

import Header from "../components/Reports/Header";

const Reports = () => {
 
  return (
    <Layout>
      <div className="container-full-page">
        <div className="container-header">
          <Header />
        </div>
        <div className="accounts-list-wrapper"></div>
        
      </div>
    </Layout>
  );
};

export default Reports;

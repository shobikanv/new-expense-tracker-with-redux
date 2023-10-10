import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import ListAccounts from "../components/Accounts/ListAccounts/List";
import AddAccount from "../components/Accounts/AccountForm";
import { Grid } from "semantic-ui-react";
import TransactionForm from "../components/Transactions/Form/TransactionForm";
import TransactionList from "../components/Transactions/List/TransactionList";

const Dashboard = () => {
  return (
    <Layout>   
      <div className="container-full-page">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
              <ListAccounts />
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <TransactionForm />
              <TransactionList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;

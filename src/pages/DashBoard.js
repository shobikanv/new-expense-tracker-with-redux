import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import ListAccounts from "../components/Accounts/ListAccounts/List";
import AddAccount from "../components/Accounts/AccountForm";
import { Grid } from "semantic-ui-react";
import TransactionForm from "../components/Transactions/Form/TransactionForm";
import TransactionList from "../components/Transactions/List/TransactionList";

import {
  getTransactionValues,
  getTransactions,
} from "../redux/slices/transactionSlice";

import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { transactionList } = useSelector(getTransactionValues);

  const initialMasters = async () => {
    await dispatch(getTransactions());
  };
  useEffect(() => {
    initialMasters();
  }, []);
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
              <TransactionList transactionList={transactionList} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";

import {
  getTransactionValues,
  getTransactions,
} from "../../../redux/slices/transactionSlice";

import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import "./transactionList.css";
import {
  getAccountValues,
  getAccounts,
} from "../../../redux/slices/accountSlice";

const TransactionList = ({  transactionList }) => {

  const dispatch = useDispatch();
  const { accountList } = useSelector(getAccountValues);
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const initialMasters = async () => {
   
    if (accountList && accountList.length === 0) {
      await dispatch(getAccounts());
    }
  };

  useEffect(() => {
    initialMasters();
  }, []);

  useEffect(() => {
    const sorted = [...transactionList].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedTransactions(sorted);
  }, [transactionList]);

  const recentTransactions = sortedTransactions.slice(0, 30);

  const renderTransaction = (transaction) => (
    <Item
      key={transaction.id}
      transaction={transaction}
      accountList={accountList}
    />
  );

  return (
    <Segment className="transactions-list__wrapper">
      {recentTransactions?.length > 0 ? (
        recentTransactions.map((transaction) => renderTransaction(transaction))
      ) : (
        <div className="transactions-list__empty">No transactions found.</div>
      )}
    </Segment>
  );
};
export default TransactionList;

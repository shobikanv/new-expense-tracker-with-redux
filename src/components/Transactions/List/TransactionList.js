import React, { useEffect,useState } from "react";
import { Segment } from "semantic-ui-react";

import {
  getTransactionValues,
  getTransactions,
} from "../../../redux/slices/transactionSlice";

import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import "./transactionList.css";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactionList } = useSelector(getTransactionValues);
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const initialMasters = async () => {
    if (transactionList && transactionList.length === 0) {
      await dispatch(getTransactions());
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
    <Item key={transaction.id} transaction={transaction} />
  );

  return (
    <Segment className="transactions-list__wrapper">
      {transactionList.length > 0 ? (
        recentTransactions.map((transaction) => renderTransaction(transaction))
      ) : (
        <div className="transactions-list__empty">No transactions found.</div>
      )}
    </Segment>
  );
};
export default TransactionList;

import React, { useEffect } from "react";
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

  const initialMasters = async () => {
    if (transactionList && transactionList.length === 0) {
      await dispatch(getTransactions());
    }
  };
  console.log("transactionList", transactionList);
  useEffect(() => {
    initialMasters();
  }, []);


  const renderTransaction = (transaction) => (
    <Item key={transaction.id} transaction={transaction} />
  );

  return (
    <Segment className="transactions-list__wrapper">
      {transactionList.length > 0 ? (
        transactionList.map((transaction) => renderTransaction(transaction))
      ) : (
        <div className="transactions-list__empty">No transactions found.</div>
      )}
    </Segment>
  );
};
export default TransactionList;

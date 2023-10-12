import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import ModalForm from "../components/Transactions/Form/ModalForm";
import TransactionList from "../components/Transactions/List/TransactionList";
import Filter from "../components/Transactions/Filter/Form";

import {
  getTransactionValues,
  getTransactions,
} from "../redux/slices/transactionSlice";

import { useDispatch, useSelector } from "react-redux";

const Transactions = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    from_date: "",
    to_date: "",
    tags: '',
    accounts: "",
  });

  const { transactionList } = useSelector(getTransactionValues);

  const initialMasters = async () => {
    await dispatch(getTransactions(initialValues));
  };
  useEffect( () => {
    initialMasters();
  }, [initialValues]);

  return (
    <Layout>
      <div className="container-full-page">
        <div className="container-header">
          <Filter
            setOpenModal={setOpenModal}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        </div>
        <div className="accounts-list-wrapper">
          <TransactionList transactionList={transactionList} />
        </div>
        {openModal && (
          <ModalForm
            isEdit={false}
            handleClose={() => {
              setOpenModal(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default Transactions;

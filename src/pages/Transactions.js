import React, { useState } from "react";
import Layout from "./Layout/Layout";
import ModalForm from "../components/Transactions/Form/ModalForm";
import TransactionList from "../components/Transactions/List/TransactionList";
import Filter from "../components/Transactions/Filter/Form";

const Transactions = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Layout>
      <div className="container-full-page">
        <div className="container-header">
          <Filter setOpenModal={setOpenModal} />
        </div>
        <div className="accounts-list-wrapper">
          <TransactionList />
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

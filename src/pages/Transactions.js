import React, { useState } from "react";
import Layout from "./Layout/Layout";
import ListAccounts from "../components/Accounts/ListAccounts/List";
import ModalForm from "../components/Accounts/ModalForm";
import { Button } from "semantic-ui-react";
import TransactionList from "../components/Transactions/List/TransactionList";

const Transactions = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Layout>
      <div className="container-full-page">
        <div className="container-header">
          <Button.Group basic>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </Button.Group>
        </div>
        <div className="accounts-list-wrapper">
          <TransactionList />
        </div>
        {openModal && <ModalForm isEdit={false} handleClose={()=>{setOpenModal(false)}} account={null}/>}
      </div>
    </Layout>
  );
};

export default  Transactions
  ;

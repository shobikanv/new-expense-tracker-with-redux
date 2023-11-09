import React, { useState } from "react";
import Layout from "./Layout/Layout";
import ListAccounts from "../components/Accounts/ListAccounts/List/List";
import ModalForm from "../components/Accounts/ModalForm/ModalForm";
import { Button } from "semantic-ui-react";

const Accounts = () => {
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
          <ListAccounts />
        </div>
        {openModal && (
          <ModalForm
            isEdit={false}
            handleClose={() => {
              setOpenModal(false);
            }}
            account={null}
          />
        )}
      </div>
    </Layout>
  );
};

export default Accounts;

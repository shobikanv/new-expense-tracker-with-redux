import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import Amount from "../../../../utils/Amount";
import ModalForm from "../../ModalForm/ModalForm";

const AccountItem = ({ account, isEdit }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleEditAccount = () => {
    setOpenModal(true);
  };
  return (
    <div className="account-widget-account">
      <div className="account-widget-account__name">
        <Link to={`/transactions/${account.id}`}>{account.name}</Link>
      </div>
      <div className="account-widget-account__balance">
        <Amount value={account.balance} showColor={true} />
      </div>
      {isEdit && (
        <div className="account-widget-account__edit">
          <Button
            basic
            circular
            icon="pencil"
            onClick={handleEditAccount}
            data-testid="edit-button"
          />
        </div>
      )}
      {openModal && (
        <ModalForm
          isEdit={true}
          account={account}
          handleClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default AccountItem;

import React, { useEffect, useState } from "react";
import { Icon, Button, Label } from "semantic-ui-react";
import Amount from "../../../utils/Amount";

import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../lib/common-helper";
import "./transactionList.css";
import ModalForm from "../Form/Modal Form/ModalForm";

const Item = ({ transaction, accountList }) => {
  const [openModal, setOpenModal] = useState(false);

  const getAccountNameById = (accountId) => {
    const account = accountList.find((account) => account.id === accountId);
    return account ? account.name : "Unknown Account";
  };

  const renderArrow = () => {
    if (
      transaction.transaction_type !== "TRANSFER" &&
      !transaction.tags &&
      !transaction.note
    )
      return;

    return (
      <Icon
        color="grey"
        name={
          transaction.transaction_type === "INCOME"
            ? "arrow left"
            : "arrow right"
        }
      />
    );
  };

  const renderLinkedAmount = () => {
    const { linkedAmount, linkedCurrency, currency } = this.props.transaction;
    if (!linkedCurrency || linkedCurrency === currency) return;

    return (
      <span>
        <Icon color="grey" name="arrow right" />
        <Amount value={linkedAmount} code={linkedCurrency} showColor={false} />
      </span>
    );
  };
  const handleEditClick = () => {
    setOpenModal(true);
  };
  return (
    <div className="transaction-item">
      <div className="transaction-item__date">
        {formatDate(transaction.date)}
      </div>
      <div className="transaction-item__info">
        {getAccountNameById(transaction.account)}
        {renderArrow()}
        {transaction.transaction_type === "TRANSFER" &&
          getAccountNameById(transaction.destination_account)}
        {transaction.tags &&
          transaction.tags.map((tag) => (
            <Label key={tag.id} content={tag.name} />
          ))}
        <span className="transaction-item__info__note">{transaction.note}</span>
      </div>
      <div className="transaction-item__amount">
        <Amount
          value={transaction.amount}
          showColor={transaction.transaction_type !== "TRANSFER"}
          type={transaction.transaction_type}
        />
        {transaction.kind === "Transfer" && renderLinkedAmount()}
      </div>
      <div className="transaction-item__edit">
        <Button
          circular
          basic
          icon="pencil"
          onClick={handleEditClick}
          disabled={transaction.archived}
        />
      </div>
      {openModal && (
        <ModalForm
          isEdit={true}
          handleClose={() => {
            setOpenModal(false);
          }}
          transaction={transaction}
        />
      )}
    </div>
  );
};
export default Item;

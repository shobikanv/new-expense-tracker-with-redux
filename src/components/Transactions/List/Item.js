import React, { useEffect, useState } from "react";
import { Icon, Button, Label } from "semantic-ui-react";
import Amount from "../../../utils/Amount";

import {
  getAccountValues,
  getAccounts,
} from "../../../redux/slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../lib/common-helper";
import "./transactionList.css";
import ModalForm from "../Form/ModalForm";

const Item = (transaction) => {
  const dispatch = useDispatch();
  const transact = transaction.transaction;
  const { accountList } = useSelector(getAccountValues);
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    if (accountList && accountList.length === 0) {
      dispatch(getAccounts());
    }
  }, []);
  const getAccountNameById = (accountId) => {
    const account = accountList.find((account) => account.id === accountId);
    return account ? account.name : "Unknown Account";
  };

  const renderArrow = () => {
    if (
      transact.transaction_type !== "TRANSFER" &&
      !transact.tags &&
      !transact.note
    )
      return;

    return (
      <Icon
        color="grey"
        name={
          transact.transaction_type === "INCOME" ? "arrow left" : "arrow right"
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
      <div className="transaction-item__date">{formatDate(transact.date)}</div>
      <div className="transaction-item__info">
        {getAccountNameById(transact.account)}
        {renderArrow()}
        {transact.transaction_type === "TRANSFER" &&
          getAccountNameById(transact.destination_account)}
        {transact.tags &&
          transact.tags.map((tag) => <Label key={tag.id} content={tag.name} />)}
        <span className="transaction-item__info__note">{transact.note}</span>
      </div>
      <div className="transaction-item__amount">
        <Amount
          value={transact.amount}
          showColor={transact.transaction_type !== "TRANSFER"}
          type={transact.transaction_type}
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

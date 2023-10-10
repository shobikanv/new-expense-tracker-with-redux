import { Header, Modal } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import TransactionForm from "./TransactionForm";
import {
  deleteTransactions,
  getTransactions,
} from "../../../redux/slices/transactionSlice";
import { toastMessage } from "../../../lib/common-helper";
import { useDispatch } from "react-redux";

const ModalForm = ({ transaction, handleClose, isEdit }) => {
  const dispatch = useDispatch();
  const removeTransaction = async () => {
    await dispatch(deleteTransactions({ id: transaction.transaction.id }));
    handleClose();
    toastMessage(`Transaction Deleted Successfully`, 'success');
    await dispatch(getTransactions());
  };
  return (
    <Modal
      closeIcon
      size="small"
      className="transaction"
      open={true}
      onClose={handleClose}
    >
      <Header
        icon="file text outline"
        content={isEdit ? "Edit Transaction" : "New Transaction"}
      />
      <Modal.Content>
        <TransactionForm
          transaction={transaction}
          handleClose={handleClose}
          isEdit={isEdit}
        />
      </Modal.Content>
      {isEdit && (
        <Modal.Actions>
          <Button
            negative
            icon="trash"
            content="Delete"
            labelPosition="right"
            onClick={() => removeTransaction()}
          />
        </Modal.Actions>
      )}
    </Modal>
  );
};
export default ModalForm;

import { Header, Modal } from "semantic-ui-react";
import AccountForm, { Form } from "./AccountForm";

const ModalForm = ({ isEdit,account,handleClose }) => {
  return (
    <Modal closeIcon size="small" open={true} onClose={handleClose}
    >
      <Header
        icon="file text outline"
        content={isEdit ? "Edit Account" : "New Account"}
      />
      <Modal.Content>
        <AccountForm account={account} handleClose={handleClose}/>
      </Modal.Content>
    </Modal>
  );
};
export default ModalForm;

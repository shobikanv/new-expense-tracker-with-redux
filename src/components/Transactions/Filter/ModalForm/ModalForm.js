import { Form, Modal, Button, Dropdown } from "semantic-ui-react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAccountValues,
  getAccounts,
} from "../../../../redux/slices/accountSlice";
import { getTagValues, getTags } from "../../../../redux/slices/tagSlice";

const ModalForm = ({ handleClose, initialValues, setInitialValues }) => {
  const dispatch = useDispatch();
  const { accountList } = useSelector(getAccountValues);
  const { tagList } = useSelector(getTagValues);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const initialMasters = async () => {
    if (accountList && accountList.length === 0) {
      await dispatch(getAccounts());
    }
    if (tagList && tagList.length === 0) {
      await dispatch(getTags());
    }
  };

  useEffect(() => {
    initialMasters();
  }, []);

  const handleAccountChange = (values) => {
    setSelectedAccounts(values);
  };

  const handleTagChange = (values) => {
    setSelectedTags(values);
  };

  const handleApply = () => {
    const selectedAccountNames = selectedAccounts.map((accountId) => {
      const account = accountList.find((account) => account.id === accountId);
      return account ? account.name : null;
    });

    const selectedTagNames = selectedTags.map((tagName) => {
      const tag = tagList.find((tag) => tag.name === tagName);
      return tag ? tag.name : null;
    });

    const updatedInitialValues = {
      ...initialValues,
      accounts: selectedAccountNames.filter((name) => name !== null),
      tags: selectedTagNames.filter((name) => name !== null),
    };

    setInitialValues(updatedInitialValues);
    handleClose();
  };

  return (
    <Modal open={true} onClose={handleClose} closeIcon size="tiny">
      <Modal.Header>Filter transactions</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="account">Account</label>
              <Dropdown
                multiple
                selection
                search
                closeOnChange
                onChange={(e, { value }) => {
                  handleAccountChange(value);
                }}
                options={accountList.map((account) => ({
                  key: account.id,
                  value: account.id,
                  text: account.name,
                  description: account.group,
                }))}
                id="account"
                data-testid="account"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="tags">Tags</label>
              <Dropdown
                multiple
                selection
                search
                closeOnChange
                onChange={(e, { value }) => {
                  handleTagChange(value);
                }}
                options={tagList.map((tag) => ({
                  key: tag.name,
                  value: tag.name,
                  text: tag.name,
                }))}
                id="tags"
                data-testid="tags"
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Reset" />
        <Button content="Apply" positive onClick={handleApply} />
      </Modal.Actions>
    </Modal>
  );
};

export default ModalForm;

import React, { useEffect, useState } from "react";
import { Form, Button, Dropdown, Input, Segment } from "semantic-ui-react";
import FormHeader from "./FormHeader";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addTags, getTagValues, getTags } from "../../../redux/slices/tagSlice";
import {
  getAccounts,
  getAccountValues,
} from "../../../redux/slices/accountSlice";
import {
  addTransactions,
  getTransactions,
} from "../../../redux/slices/transactionSlice";

import "./transactionForm.css";
import { toastMessage } from "../../../lib/common-helper";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const { tagList } = useSelector(getTagValues);
  const { accountList } = useSelector(getAccountValues);
  const [kind, setKind] = useState("Income");

  const initialMasters = async () => {
    if (accountList && accountList.length === 0) {
      await dispatch(getAccounts());
    }
    if (tagList && tagList.length === 0) {
      dispatch(getTags());
    }
  };

  useEffect(() => {
    initialMasters();
  }, []);

  const handleSubmit = async (values) => {
    values.transaction_type = kind.toUpperCase();

    values.tags = values.tags.map((tagName) => ({ name: tagName }));

    const { payload } = await dispatch(addTransactions({ params: values }));
    if (payload && payload.id) {
      toastMessage("Transaction Added Successfully", "success");
      await dispatch(getTransactions());
      formik.resetForm();
      formik.setFieldValue("date", null);
    }
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required("Amount is required"),
    
  });

  const initialValues = {
    tags: [],
    transaction_type: null,
    amount: null,
    date: null,
    flag: false,
    note: "",
    account: null,
    destination_account: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const handleAccountChange = (event, { value }) => {
    formik.setFieldValue("account", value);
  };
  const handleTagChange = (event, { value }) => {
    console.log("Valueee121212", value);
    formik.setFieldValue("tags", value);
  };
  const onTagAdd = async (event, { value }) => {
    const { payload } = await dispatch(addTags({ params: { name: value } }));

    if (payload.name === value) {
      formik.setFieldValue("tags", [...formik.values.tags, payload.id]);
      await dispatch(getTags());
      toastMessage(`${payload.name} tag added Successfully`, "success");
    }
  };

  const getGridClassName = () =>
    kind === "Transfer"
      ? "transaction-form-grid single-line"
      : "transaction-form-grid";

  return (
    <React.Fragment>
      <FormHeader kind={kind} setKind={setKind} />
      <Segment attached="bottom">
        <Form onSubmit={formik.handleSubmit} className="transaction-form">
          <div className="fields">
            <Form.Field width={11} className="mobile-with-margin">
              <label>{kind === "Income" ? `To` : `From`}</label>
              <Dropdown
                selection
                options={accountList.map((account) => ({
                  key: account.id,
                  value: account.id,
                  text: account.name,
                  description: account.group,
                }))}
                value={formik.values.account}
                onChange={handleAccountChange}
              />
            </Form.Field>
            {kind === "Transfer" && (
              <Form.Field width={11} className="mobile-with-margin">
                <label>To</label>
                <Dropdown
                  selection
                  options={accountList.map((account) => ({
                    key: account.id,
                    value: account.id,
                    text: account.name,
                    description: account.group,
                  }))}
                  value={formik.values.destination_account}
                  onChange={(e, { value }) => {
                    formik.setFieldValue("destination_account", value);
                  }}
                />
              </Form.Field>
            )}
            <Form.Field
              width={5}
              className="mobile-with-margin input-right no-label"
            >
              <Input
                required
                type="number"
                min={1}
                step={1}
                value={formik.values.amount}
                onChange={(e, { value }) => {
                  formik.setFieldValue("amount", value);
                }}
                labelPosition="right"
                label={"USD"}
              />
            </Form.Field>
          </div>

          <div className={getGridClassName()}>
            <div className="transaction-form-grid__column-wide">
              {kind !== "Transfer" && (
                <div className="transaction-form-grid__field">
                  <Form.Field>
                    <label>Tags</label>
                    <Dropdown
                      multiple
                      selection
                      search
                      allowAdditions
                      closeOnChange
                      placeholder="Choose existing tags or add new"
                      value={formik.values.tags}
                      options={tagList.map((tag) => ({
                        key: tag.id,
                        value: tag.name,
                        text: tag.name,
                      }))}
                      onChange={handleTagChange}
                      onAddItem={onTagAdd}
                    />
                  </Form.Field>
                </div>
              )}

              <div className="transaction-form-grid__field">
                <Form.Field>
                  <Input
                    placeholder="Note"
                    value={formik.values.note}
                    onChange={(e, { value }) => {
                      formik.setFieldValue("note", value);
                    }}
                  />
                </Form.Field>
              </div>
            </div>
            <div className="transaction-form-grid__column-narrow">
              <div className="transaction-form-grid__field">
                <Form.Field>
                  <Input
                    required
                    fluid
                    type="date"
                    value={formik.values.date}
                    onChange={(e, { value }) => {
                      formik.setFieldValue("date", value);
                    }}
                  />
                </Form.Field>
              </div>
              <div className="transaction-form-grid__field">
                <Button
                  primary
                  fluid
                  disabled={parseFloat(formik.values.amount) === 0}
                >
                  SAVE
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Segment>
    </React.Fragment>
  );
};

export default TransactionForm;

import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import validationSchema from "./Validation";
import { GroupOptions } from "../../lib/constants";
import {
  addAccount,
  editAccount,
  getAccounts,
} from "../../redux/slices/accountSlice";
import { useDispatch } from "react-redux";
import { toastMessage } from "../../lib/common-helper";

const AccountForm = ({ account, handleClose }) => {
  const dispatch = useDispatch();
  const initialValues = {
    name: account?.name || "",
    group: account?.group || "",
    balance: account?.balance || 0,
  };

  const handleSubmit = async (values) => {
    if (account && account.id) {
      const { payload } = await dispatch(
        editAccount({ id: account.id, params: values })
      );
      if (payload.name === values.name) {
        await dispatch(getAccounts());
        formik.resetForm();
        handleClose();
        toastMessage("Saved Successfully", "success");
      } else {
        toastMessage("Something went Wrong", "error");
      }
    } else {
      const { payload } = await dispatch(addAccount({ params: values }));
      if (payload.name === values.name) {
        await dispatch(getAccounts());
        formik.resetForm();
        handleClose();
        toastMessage(`${payload.name} added Successfully`, "success");
      } else {
        toastMessage("Something went Wrong", "error");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Form className="account-form" onSubmit={formik.handleSubmit}>
      <Form.Field>
        <label>Name</label>
        <input
          name="name"
          placeholder="Account name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </Form.Field>
      <Form.Field>
        <label>Group</label>
        <Form.Select
          name="group"
          options={GroupOptions}
          placeholder="Select a group"
          value={formik.values.group}
          onChange={(e, { value }) => formik.setFieldValue("group", value)}
          onBlur={formik.handleBlur}
        />
        {formik.touched.group && formik.errors.group && (
          <div className="error">{formik.errors.group}</div>
        )}
      </Form.Field>
      <Form.Field>
        <label>Balance</label>
        <input
          type="number"
          name="balance"
          placeholder="Balance"
          value={formik.values.balance}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.balance && formik.errors.balance && (
          <div className="error">{formik.errors.balance}</div>
        )}
      </Form.Field>
      <Form.Button primary fluid content="Save Account" type="submit" />
    </Form>
  );
};

export default AccountForm;

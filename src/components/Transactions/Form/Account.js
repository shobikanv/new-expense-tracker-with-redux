import React from "react";
import { Form, Dropdown } from "semantic-ui-react";

const Accounts = ({ kind, formik, accountList }) => {
    const handleAccountChange = (event, { value }) => {
      formik.setFieldValue("account", value);
    };

  return (
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
  );
};

export default Accounts;

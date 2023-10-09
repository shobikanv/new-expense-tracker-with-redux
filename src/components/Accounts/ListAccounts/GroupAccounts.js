import React from "react";
import AccountItem from "./Items";
import Amount from "../../../utils/Amount";

const GroupAccounts = ({ group,isEdit }) => {
  
  return (
    <div className="account-widget-group">
      <div className="account-widget-group__header">
        <span className="account-widget-group__name">{group.name}</span>
        <span className="account-widget-group__total">
        <Amount value={group.total} showColor={true}/>
        </span>
      </div>
      {group.accounts.map((account) => (
        <AccountItem
          key={account.id}
          account={account}
          isEdit={isEdit}
        />
      ))}
    </div>
  );
};

export default GroupAccounts;

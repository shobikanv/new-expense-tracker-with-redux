import React,{useState} from "react";
import AccountItem from "./Items";
import Amount from "../../../utils/Amount";

const GroupAccounts = ({ group, isEdit }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="account-widget-group">
      <div className="account-widget-group__header" onClick={toggleSection}>
        <span className="account-widget-group__name">{group.name}</span>
        <span className="account-widget-group__total">
          <Amount value={group.total} showColor={true} />
        </span>
      </div>

      {!isCollapsed &&
        group.accounts.map((account) => (
          <AccountItem key={account.id} account={account} isEdit={isEdit} />
        ))}
    </div>
  );
};

export default GroupAccounts;

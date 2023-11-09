import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router
import GroupAccounts from "../GroupAccounts/GroupAccounts";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccounts,
  getAccountValues,
} from "../../../../redux/slices/accountSlice";

const ListAccounts = () => {
  const dispatch = useDispatch();
  const { accountList } = useSelector(getAccountValues);
  const location = useLocation();

  const [groupedAccounts, setGroupedAccounts] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    console.count("tedghcbnjm");
    setIsEdit(location.pathname.includes("/accounts"));
  }, [location]);

  const initialMasters = async () => {
    if (accountList && accountList.length === 0) {
      await dispatch(getAccounts());
    }
  };

  useEffect(() => {
    initialMasters();
  }, []);

  useEffect(() => {
    const grouped = accountList.reduce((groups, account) => {
      const { group, balance } = account;
      if (!groups[group]) {
        groups[group] = { name: group, accounts: [], total: 0 };
      }
      groups[group].accounts.push(account);
      groups[group].total += parseFloat(balance);
      return groups;
    }, {});
    setGroupedAccounts(grouped);
  }, [accountList]);

  return Object.values(groupedAccounts).map((group) => (
    <GroupAccounts key={group.name} group={group} isEdit={isEdit} />
  ));
};

export default ListAccounts;

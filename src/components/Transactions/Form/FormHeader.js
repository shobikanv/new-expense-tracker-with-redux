import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

const FormHeader = ({kind, setKind}) => {

  const changeKind = (selectedKind) => {
    setKind(selectedKind);
  };

  const kinds = ['Expense', 'Transfer', 'Income'];

  return (
    <Menu attached="top" widths={kinds.length}>
      {kinds.map((kindItem) => (
        <Menu.Item
          key={kindItem}
          color={
            kindItem === 'Expense'
              ? "red"
              : kindItem === 'Income'
              ? "green"
              : "black"
          }
          name={kindItem}
          active={kind === kindItem}
          onClick={() => changeKind(kindItem)}
        />
      ))}
    </Menu>
  );
};

export default FormHeader;

import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

const FormHeader = ({kind, setKind}) => {

  const changeKind = (selectedKind) => {
    setKind(selectedKind);
  };

  const kinds = ['EXPENSE', 'TRANSFER', 'INCOME'];

  return (
    <Menu attached="top" widths={kinds.length}>
      {kinds.map((kindItem) => (
        <Menu.Item
          key={kindItem}
          color={
            kindItem === 'EXPENSE'
              ? "red"
              : kindItem === 'INCOME'
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

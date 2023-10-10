import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { FilterOptions } from "../../../lib/constants";
import ModalForm from "./ModalForm";

const Header = ({ setOpenModal }) => {
  const [filterModal, setFilterModal] = useState(false);
  const handleDateRange = () => {};
  return (
    <>
      <Button.Group basic>
        <Button
          icon="plus"
          labelPosition="left"
          content="New"
          onClick={() => {
            setOpenModal(true);
          }}
        />
        <Dropdown
          button
          className="icon"
          options={FilterOptions}
          defaultValue={"Test"}
          onChange={() => {
            handleDateRange();
          }}
          text={"Test"}
          labeled
          icon="calendar"
        />
        <Button
          icon="filter"
          onClick={() => {
            setFilterModal(true);
          }}
        />
      </Button.Group>
      {filterModal && <ModalForm handleClose={()=>{setFilterModal(false)}} />}
    </>
  );
};
export default Header;

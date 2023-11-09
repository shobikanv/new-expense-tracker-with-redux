import React, { useState, useEffect, useMemo } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { FilterOptions } from "../../../../lib/constants";
import ModalForm from "../ModalForm/ModalForm";
import { calculateDateRange } from "../../../../utils/DateRange";
import Calender from "../Calender";

const Header = ({ setOpenModal, initialValues, setInitialValues }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedOption, setSelectedOption] = useState(FilterOptions[3].value);

  useEffect(() => {
    if (selectedOption === "custom") {
      setShowCalender(true);
    } else {
      const dates = calculateDateRange(selectedOption);
      setInitialValues({
        ...initialValues,
        from_date: dates.from_date,
        to_date: dates.to_date,
      });
    }
  }, [selectedOption]);

  const handleDateRange = (value) => {
    setSelectedOption(value);

    if (value === "custom") {
      setShowCalender(true);
    } else {
      const dates = calculateDateRange(value);
      setInitialValues({
        ...initialValues,
        from_date: dates.from_date,
        to_date: dates.to_date,
      });
    }
  };

  const selectedOptionText = useMemo(() => {
    const [fromDay, fromMonth, fromYear] = initialValues.from_date.split("/");
    const [toDay, toMonth, toYear] = initialValues.to_date.split("/");

    const fromDate = new Date(`${fromYear}-${fromMonth}-${fromDay}`);
    const toDate = new Date(`${toYear}-${toMonth}-${toDay}`);

    const options = { day: "numeric", month: "short" };
    const fromDateString = fromDate.toLocaleDateString("en-US", options);
    const toDateString = toDate.toLocaleDateString("en-US", options);

    if (fromDate.toDateString() === toDate.toDateString()) {
      return fromDateString;
    } else {
      return `${fromDateString} - ${toDateString}`;
    }
  }, [selectedOption, initialValues]);

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
          value={selectedOption}
          labeled
          icon="calendar"
          onChange={(e, { value }) => handleDateRange(value)}
          text={selectedOptionText}
        />
        <Button
          icon="filter"
          onClick={() => {
            setFilterModal(true);
          }}
          data-testid="filter"
        />
      </Button.Group>
      {filterModal && (
        <ModalForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          handleClose={() => {
            setFilterModal(false);
          }}
        />
      )}
      {showCalender && (
        <Calender
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          handleClose={() => {
            setShowCalender(false);
          }}
        />
      )}
    </>
  );
};

export default Header;

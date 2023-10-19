import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 8, 0);
const toMonth = new Date(currentYear + 2, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

const Calendar = ({ initialValues, setInitialValues, handleClose }) => {
  const { from_date, to_date } = initialValues;
  const [state, setState] = useState({
    month: null,
    from: null,
    to: null,
  });
  let month = "";

  const handleYearMonthChange = () => {};

  const handleDayClick = () => {};

  return (
    <Modal
      open={true}
      onClose={handleClose}
      className="transactions-filter-modal"
      closeIcon
      size="small"
    >
      <Modal.Header>Show transactions in range</Modal.Header>
      <Modal.Content>
        <DayPicker
          className="Range"
          fixedWeeks
          enableOutsideDays
          numberOfMonths={2}
          selectedDays={[from_date, { from_date, to_date }]}
          month={month}
          captionElement={<YearMonthForm onChange={handleYearMonthChange} />}
          onDayClick={handleDayClick}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button content="Reset" />
        <Button content="Apply" positive />
      </Modal.Actions>
    </Modal>
  );
};

export default Calendar;

import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { ReportOptions, TimeSpanOptions } from "../../lib/constants";
import ExpenseIncomeChart from "./Type/ExpenseIncome";
import ExpenseTagsChart from "./Type/ExpenseTags";
import NetIncomeChart from "./Type/NetIncome";
import NetWorthChart from "./Type/NetWorth";

const Header = () => {
  const currentDate = new Date();
  const [selectedReport, setSelectedReport] = useState("expense_income");
  const [selectedOption, setSelectedOption] = useState("Monthly");
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const handleOptionSelect = (_, { value }) => {
    setSelectedOption(value);
  };
  const handleYearChange = (event) => {
    const { value } = event.target;
    setSelectedYear(parseInt(value, 10));
    setSelectedMonth(null);
  };

  const handleArrowYear = (increment) => {
    setSelectedYear((prevYear) => prevYear + increment);
  };

  const handleArrowMonth = (increment) => {
    setSelectedMonth((prevMonth) => {
      let newMonth = (prevMonth + increment + 12) % 12;
      let newYear = selectedYear;

      if (newMonth === 11 && increment === 1) {
        newYear += 1;
      } else if (newMonth === 0 && increment === -1) {
        newYear -= 1;
      }

      setSelectedYear(newYear);
      return newMonth;
    });
  };

  const monthName = (month) => {
    const date = new Date();
    date.setMonth(month);
    return date.toLocaleString("default", { month: "short" });
  };

  return (
    <div className="container-header">
      <Button.Group basic>
        <Dropdown
          basic
          button
          icon={false}
          options={ReportOptions}
          value={selectedReport}
          onChange={(e, { value }) => {
            setSelectedReport(value);
          }}
        />
        <Button
          icon="chevron left"
          onClick={() => {
            if (selectedOption === "Yearly") {
              handleArrowYear(-1);
            } else {
              handleArrowMonth(-1);
            }
          }}
        />

        <Dropdown
          basic
          button
          text={
            selectedOption === "Yearly"
              ? selectedYear
              : `${monthName(selectedMonth)}, ${selectedYear}`
          }
          icon={false}
          options={TimeSpanOptions}
          value={selectedOption}
          onChange={handleOptionSelect}
        />
        <Button
          icon="chevron right"
          onClick={() => {
            if (selectedOption === "Yearly") {
              handleArrowYear(1);
            } else {
              handleArrowMonth(1);
            }
          }}
        />
      </Button.Group>
      {/* <>{selectedReport==='expense_income' && <ExpenseIncomeChart month={selectedMonth} year={selectedYear}/>} */}

      <>
        {selectedReport === "expense_income" && (
          <>
            {selectedOption === "Monthly" ? (
              <ExpenseIncomeChart
                year={selectedYear}
                month={selectedMonth}
                type="daily"
              />
            ) : (
              <ExpenseIncomeChart year={selectedYear} type={selectedReport} />
            )}
          </>
        )}
        {selectedReport === "expenses_tags" && (
          <>
            {selectedOption === "Monthly" ? (
              <ExpenseTagsChart
                year={selectedYear}
                month={selectedMonth + 1}
                type={selectedReport}
              />
            ) : (
              <ExpenseTagsChart year={selectedYear} type={selectedReport} />
            )}
          </>
        )}

        {selectedReport === "net_income" && (
          <>
            {selectedOption === "Monthly" ? (
              <NetIncomeChart
                year={selectedYear}
                month={selectedMonth + 1}
                type="daily"
              />
            ) : (
              <NetIncomeChart year={selectedYear} type={selectedReport} />
            )}
          </>
        )}

        {selectedReport === "net_worth" && (
          <>
            {selectedOption === "Monthly" ? (
              <NetWorthChart
                year={selectedYear}
                month={selectedMonth + 1}
                type="daily"
              />
            ) : (
              <NetWorthChart year={selectedYear} type={selectedReport} />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Header;

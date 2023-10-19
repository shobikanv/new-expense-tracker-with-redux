import React, { useState, useEffect } from "react";

import ApexCharts from "react-apexcharts";
import { MonthList } from "../../../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { getReportValues, getReports } from "../../../redux/slices/reportSlice";

function ExpenseIncomeChart({ year, month, type }) {
  const { reports } = useSelector(getReportValues);
  const dispatch = useDispatch();

  let urlParams = {};
  if (month) {
    urlParams = { year: year, month: month, type: type };
  } else {
    urlParams = { year: year, type: type };
  }
  const initialMasters = async () => {
    dispatch(getReports({ params: urlParams }));
  };
  useEffect(() => {
    initialMasters();
  }, [year, type, month]);

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Incomes",
      data: [],
    },
    {
      name: "Expenses",
      data: [],
    },
  ]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      grouped: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: MonthList,
    },
    yaxis: {
      min: 0,
      max: 10000,
      tickAmount: 10,
      labels: {
        formatter: function (val) {
          return val.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          });
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 40,
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  });
  useEffect(() => {
    const data = reports;

    const incomes = Array(12).fill(0);
    const expenses = Array(12).fill(0);

    for (const month in data) {
      const monthData = data[month];
      const monthIndex = parseInt(month) - 1;
      incomes[monthIndex] = monthData.total_income;
      expenses[monthIndex] = monthData.total_expenses;
    }

    setChartSeries([
      {
        name: "Incomes",
        data: incomes,
      },
      {
        name: "Expenses",
        data: expenses,
      },
    ]);
    if (month >= 0) {
      const daysInMonth = new Date(year, month, 0).getDate();
      setChartOptions((options) => ({
        ...options,
        xaxis: {
          categories: Array(daysInMonth)
            .fill()
            .map((_, index) => `${index + 1}`),
        },
      }));
    }
  }, [year, type, month]);

  return (
    <>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </>
  );
}

export default ExpenseIncomeChart;

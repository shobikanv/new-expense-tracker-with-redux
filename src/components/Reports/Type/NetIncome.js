import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReportValues, getReports } from "../../../redux/slices/reportSlice";
import ApexCharts from "react-apexcharts";

function NetIncomeChart({ year, month, type }) {
  console.log(year, month, type, "inside eichart");
  const [chartSeries, setChartSeries] = useState([
    {
      name: "Incomes",
      data: [],
    },
  ]);

  const { reports } = useSelector(getReportValues);
  const dispatch = useDispatch();
  let urlParams = {};
  if (month) {
    urlParams = { year: year, month: month, type: type };
  } else {
    urlParams = { year: year, type: type };
  }
  const initialMasters = async () => {
    await dispatch(getReports({ params: urlParams }));
  };
  useEffect(() => {
    initialMasters();
  }, [year, type, month]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
        color: [],
      },
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    yaxis: {
      min: -2000,
      max: 5000,
      tickAmount: 14,
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
    const incomes = Array(12).fill(0);
    let colors = [];

    for (const month in reports) {
      const monthData = reports[month];
      const monthIndex = parseInt(month) - 1;
      incomes[monthIndex] = monthData.net_income;
      colors.push(monthData.net_income < 0 ? "#f44336" : "#7cb342");
    }
    console.log(colors);
    console.log("incomes", incomes);
    setChartSeries([
      {
        name: "Net-Income",
        data: incomes,
      },
    ]);
    let categories;
    if (type === "daily") {
      categories = Array.from({ length: 31 }, (_, i) => i + 1);
    } else {
      categories = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    }
    setChartOptions((options) => ({
      ...options,
      plotOptions: {
        ...options.plotOptions,
        bar: {
          ...options.plotOptions.bar,
          colors: {
            ranges: [
              {
                from: -2000,
                to: 0,
                color: "#f44336",
              },
              {
                from: 0,
                to: 5000,
                color: "#7cb342",
              },
            ],
          },
        },
      },
      xaxis: {
        categories,
        gridLines: {
          show: true,
          zIndex: 1,
        },
      },
    }));
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

export default NetIncomeChart;

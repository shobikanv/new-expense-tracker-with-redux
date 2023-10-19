import ApexCharts from "react-apexcharts";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReportValues, getReports } from "../../../redux/slices/reportSlice";

function ExpenseTagsChart({ year, month, type }) {
  const [tags, setTags] = useState([]);
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

  useEffect(() => {
    if (reports) {
      const filteredData = Object.keys(reports)
        .filter((key) => reports[key]?.hasOwnProperty("percentage"))
        .map((key) => ({
          name: key,
          data: reports[key].total_expenses,
        }));
      setTags(filteredData);
    }
  }, [reports]);

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        startingShape: "flat",
        endingShape: "flat",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: tags.map((tag) => tag.name),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Total Expenses",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Total Expenses",
      data: tags.map((tag) => tag.data),
    },
  ];

  return (
    <div>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default ExpenseTagsChart;

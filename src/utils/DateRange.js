export const calculateDateRange = (selectedOption) => {
  const today = new Date();
  let fromDate, toDate;

  switch (selectedOption) {
    case "today":
      fromDate = today;
      toDate = today;
      break;
    case "yesterday":
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      fromDate = yesterday;
      toDate = yesterday;
      break;
    case "lastWeek":
      fromDate = new Date(today);
      fromDate.setDate(today.getDate() - 7);
      toDate = today;
      break;

    case "lastMonth":
      fromDate = new Date(today);
      fromDate.setMonth(today.getMonth(), today.getDate() - 30);
      toDate = today;
      break;

    case "thisMonth":
      fromDate = new Date(today);
      fromDate.setDate(1);
      toDate = today;
      break;
    default:
      break;
  }


  const formattedFromDate = fromDate.toISOString().split("T")[0];
  const formattedToDate = toDate.toISOString().split("T")[0];

  return {
    from_date: formattedFromDate,
    to_date: formattedToDate,
  };
};

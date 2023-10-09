import React from "react";

const Amount = ({ value, showColor, type }) => (
  <span
    className={`mono ${
      showColor &&
      (type
        ? type === "INCOME" && value >= 0
          ? "positive"
          : "negative"
        : value >= 0
        ? "positive"
        : "negative")
    }`}
  >
    {value}
    {" USD"}
  </span>
);
export default Amount;

import React from "react";

const DateBlock = ({ dateString }) => {
  let dayWritten = new Date(dateString);
  dayWritten.setDate(dayWritten.getDate() + 1);
  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      {`${monthArr[dayWritten.getMonth()]} ${dayWritten.getDate()},
       ${dayWritten.getFullYear()}`}
    </div>
  );
};

export default DateBlock;

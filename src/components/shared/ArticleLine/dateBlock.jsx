import React from "react";

const DateBlock = ({ datestring, time }) => {
  let dayWritten = new Date(datestring);
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
  let thisTime = time.time;
  let hour = Math.floor(thisTime / 3600) % 12;
  let minute = Math.floor((thisTime % 3600) / 60);
  let state = Math.floor(thisTime / 3600) / 12 > 0 ? "PM" : "AM";
  let timeString = `${hour}:${minute} ${state}`;

  return (
    <div style={{ "font-size": "0.7em", color: "#555555" }}>
      {`${monthArr[dayWritten.getMonth()]} ${dayWritten.getDate()},
       ${timeString} ${dayWritten.getFullYear()}`}
    </div>
  );
};

export default DateBlock;

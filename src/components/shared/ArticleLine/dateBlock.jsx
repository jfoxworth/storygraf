import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const DateBlock = ({ datestring, time, articleid }) => {
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
    <LinkContainer
      to={`/Article/${articleid}`}
      style={{ fontSize: "0.7em", color: "#555555", cursor: "pointer" }}
    >
      <div>
        {`${monthArr[dayWritten.getMonth()]} ${dayWritten.getDate()},
       ${timeString} ${dayWritten.getFullYear()}`}
      </div>
    </LinkContainer>
  );
};

export default DateBlock;

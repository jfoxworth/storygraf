import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const DateBlock = ({ datestring, articleid }) => {
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
  var tempDate = new Date(datestring);
  var hours = tempDate.getHours();
  var minutes = tempDate.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return (
    <LinkContainer
      to={`/Article/${articleid}`}
      style={{ fontSize: "0.7em", color: "#555555", cursor: "pointer" }}
    >
      <div>
        {`${hours}:${minutes} ${ampm} ${
          monthArr[tempDate.getMonth()]
        } ${tempDate.getDate()}, ${tempDate.getFullYear()}`}
      </div>
    </LinkContainer>
  );
};

export default DateBlock;

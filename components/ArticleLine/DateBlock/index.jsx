import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const DateBlock = ({ article, datestring }) => {
  datestring = article?.itemDate;
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
    <div className={styles.StyledMonthDay}>
      {`${monthArr[tempDate.getMonth()]} ${tempDate.getDate()},
                  ${tempDate.getFullYear()} - ${hours}:${minutes} ${ampm}`}
    </div>
  );
};

export default DateBlock;

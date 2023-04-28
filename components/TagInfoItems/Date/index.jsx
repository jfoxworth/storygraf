/*
    This item shows the number of followers and whether or not 
    the current user is following this tag
*/
import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs";
import styles from "./styles.module.css";

const DateBlock = ({ dateString }) => {
  let dayWritten = new Date(dateString * 1000);
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
    <div className={styles.styledDateWrapper}>
      <Row>
        <Col xs={{ span: 2 }}>
          <div className={styles.styledDateIcon}>
            <BsCalendar3 />
          </div>
        </Col>
        <Col xs={{ span: 10 }}>
          <div className={styles.styledDateText}>
            {`${monthArr[dayWritten.getMonth()]} ${dayWritten.getDate()},
       ${dayWritten.getFullYear()}`}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DateBlock;

/*
    This item shows the number of followers and whether or not 
    the current user is following this tag
*/
import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs";
import styled from "styled-components";

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
    <StyledDateWrapper>
      <Row>
        <Col xs={{ span: 2 }}>
          <StyledDateIcon>
            <BsCalendar3 />
          </StyledDateIcon>
        </Col>
        <Col xs={{ span: 10 }}>
          <StyledDateText>
            {`${monthArr[dayWritten.getMonth()]} ${dayWritten.getDate()},
       ${dayWritten.getFullYear()}`}
          </StyledDateText>
        </Col>
      </Row>
    </StyledDateWrapper>
  );
};

const StyledDateWrapper = styled.div`
  font-size: 1em;
  color: #3a5199;
  width: 100%;
  padding: 0px 0px 3px 0px;
  border-bottom: 1px solid #3a5199;
  margin-bottom: 0.75em;
`;

const StyledDateIcon = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledDateText = styled.div`
  display: inline-block;
  color: #3a5199;
`;

export default DateBlock;

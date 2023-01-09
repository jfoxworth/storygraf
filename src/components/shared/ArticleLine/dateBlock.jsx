import React from "react";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

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
    <StyledDateContainer>
      <LinkContainer
        to={`/Article/${articleid}`}
        style={{ fontSize: "0.7em", color: "#555555", cursor: "pointer" }}
      >
        <>
          <Row>
            <StyledMonthDay>
              {`${monthArr[tempDate.getMonth()]} ${tempDate.getDate()}`}
            </StyledMonthDay>
          </Row>
          <Row>
            <StyledYear>{`${tempDate.getFullYear()}`}</StyledYear>
          </Row>
          <Row>
            <StyledTime>{`${hours}:${minutes} ${ampm}`}</StyledTime>
          </Row>
        </>
      </LinkContainer>
    </StyledDateContainer>
  );
};

const StyledDateContainer = styled.div`
  padding: 5px 0px;
  width: 100%;
`;

const StyledMonthDay = styled.div`
  font-size: 0.75em;
  text-align: center;
`;

const StyledYear = styled.div`
  font-size: 0.75em;
  text-align: center;
`;

const StyledTime = styled.div`
  font-size: 0.6em;
  text-align: center;
`;

export default DateBlock;

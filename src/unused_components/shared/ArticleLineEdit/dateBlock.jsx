import React from "react";
import { Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

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
    <>
      <DateWrapper>
        <LinkContainer
          to={`/Article/${article.id}`}
          style={{ fontSize: "0.7em", color: "#555555", cursor: "pointer" }}
        >
          <>
            <Row>
              <StyledMonthDay>
                {`${monthArr[tempDate.getMonth()]} ${tempDate.getDate()},
                  ${tempDate.getFullYear()}`}
              </StyledMonthDay>
            </Row>
            <Row>
              <StyledTime>{`${hours}:${minutes} ${ampm}`}</StyledTime>
            </Row>
          </>
        </LinkContainer>
      </DateWrapper>{" "}
    </>
  );
};

const DateWrapper = styled.div``;

const StyledMonthDay = styled.div`
  font-size: 0.9em;
  text-align: left;
  display: inline;
  width: 100%;
`;

const StyledTime = styled.div`
  font-size: 0.6em;
  text-align: left;
`;

export default DateBlock;

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
    <>
      <StyledHexOuterContainer>
        <StyledHexInnerContainer>
          <StyledHexContainer>
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
          </StyledHexContainer>
        </StyledHexInnerContainer>
      </StyledHexOuterContainer>
    </>
  );
};

const StyledHexOuterContainer = styled.div`
  margin-top: 0px;
  width: 104px;
  height: 60px;
  background: #3a5199;
  position: relative;
  &:before {
    content: "";
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
  }
  &:after {
    content: "";
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
  }
  &:before {
    bottom: -25px;
    border-top: 25px solid #3a5199;
  }
  &:after {
    top: -25px;
    border-bottom: 25px solid #3a5199;
  }
`;

const StyledHexInnerContainer = styled.div`
  margin-top: 0px;
  width: 104px;
  height: 60px;
  position: relative;
  left: -3px;
  background-color: #fff;
  z-index: 1;
  &:before {
    content: "";
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
  }
  &:after {
    content: "";
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
  }
  &:before {
    bottom: -24px;
    border-top: 25px solid #fff;
  }
  &:after {
    top: -24px;
    border-bottom: 25px solid #fff;
  }
`;

const StyledHexContainer = styled.div`
  margin-top: 25px;
  width: 104px;
  height: 60px;
  position: relative;
  right: -7px;
  background-color: #fff;
  -webkit-transform: scale(0.85, 0.85);
  -moz-transform: scale(0.85, 0.85);
  transform: scale(0.85, 0.85);
  z-index: 2;
  &:before {
    content: "";
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
  }
  &:after {
    content: "";
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
  }
  &:before {
    bottom: -24px;
    border-top: 25px solid #fff;
  }
  &:after {
    top: -24px;
    border-bottom: 25px solid #fff;
  }
`;

const StyledMonthDay = styled.div`
  font-size: 0.9em;
  text-align: center;
`;

const StyledYear = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledTime = styled.div`
  font-size: 0.6em;
  text-align: center;
`;

export default DateBlock;

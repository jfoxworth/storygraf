/*
    This is a simple component to display the steps in a process

*/

import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";

const Cumulative = ({ cumItem }) => {
  return (
    <CumulativeDiv bgcolor={cumItem.color}>
      <CumulativeText>{cumItem.text}</CumulativeText>
      <Badge pill bg="secondary">
        <BadgeText>{cumItem.value || 0}</BadgeText>
      </Badge>
    </CumulativeDiv>
  );
};

const CumulativeDiv = styled.div`
  background-color: ${(props) => props.bgcolor};
  margin-right: 0.5em;
  display: inline-block;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  padding: 0em 0.65em;
`;

const CumulativeText = styled.div`
  margin-right: 0.5em;
  display: inline-block;
  position: relative;
  top: -1px;
  color: #ffffff;
  font-size: 0.6em;
  letter-spacing: 0.09em;
`;

const BadgeText = styled.div`
  font-size: 0.9em;
`;

export default Cumulative;

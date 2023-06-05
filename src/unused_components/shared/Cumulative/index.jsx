/*
    This is a simple component to display the steps in a process

*/

import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const Cumulative = ({ cumItem, showText = true }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{cumItem.text}</Popover.Body>
    </Popover>
  );

  return (
    <CumulativeDiv bgcolor={cumItem.color}>
      {showText && (
        <>
          <CumulativeText>{cumItem.text}</CumulativeText>
          <Badge pill bg="secondary">
            <BadgeText>{cumItem.value || 0}</BadgeText>
          </Badge>
        </>
      )}
      {!showText && (
        <>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <CumulativeText>{cumItem.value || 0}</CumulativeText>
          </OverlayTrigger>
        </>
      )}
    </CumulativeDiv>
  );
};

const CumulativeDiv = styled.div`
  background-color: ${(props) => props.bgcolor};
  display: inline-block;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  padding: 0em 0.65em 0.15em;
`;

const CumulativeText = styled.div`
  margin: 0.2em 0.3em;
  display: inline-block;
  color: #ffffff;
  font-size: 0.7em;
  letter-spacing: 0.09em;
  cursor: pointer;
`;

const BadgeText = styled.div`
  font-size: 0.9em;
`;

export default Cumulative;

/*
    This is a simple component to display the steps in a process

*/

import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const Steps = ({ step = 0, steps = [], setStep = () => {} }) => {
  return (
    <>
      <Row className={"mt-3"}>
        {steps.map((thisStep, index) => {
          return (
            <Col key={`stepNum${index}`}>
              <StepNumber
                current={index === step}
                onClick={() => {
                  setStep(index);
                }}
              >
                {index}
              </StepNumber>
            </Col>
          );
        })}
      </Row>
      <Row>
        {steps.map((thisStep, index) => {
          return (
            <Col key={`stepText${index}`}>
              <StepText>{steps[index]}</StepText>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const StepNumber = styled.div`
  text-align: center;
  margin: auto;
  font-size: 0.75em;
  background-color: ${(props) => (props.current ? "blue" : "#cccccc")};
  color: #ffffff;
  border-radius: 10px;
  width: 20px;
  cursor: pointer;
`;

const StepText = styled.div`
  text-align: center;
  font-size: 0.75em;
`;

export default Steps;

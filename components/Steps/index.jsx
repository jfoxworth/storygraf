/*
    This is a simple component to display the steps in a process

*/

import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";

const Steps = ({ step = 0, steps = [], setStep = () => {} }) => {
  return (
    <>
      <Row className={"mt-3"}>
        {steps.map((thisStep, index) => {
          return (
            <Col key={`stepNum${index}`}>
              <div
                className={styles.StepNumber}
                style={{
                  backgroundColor: index === step ? "#a01d26" : "#cccccc",
                }}
                current={index === step}
                onClick={() => {
                  setStep(index);
                }}
              >
                {index}
              </div>
            </Col>
          );
        })}
      </Row>
      <Row>
        {steps.map((thisStep, index) => {
          return (
            <Col key={`stepText${index}`}>
              <div className={styles.StepText}>{steps[index]}</div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Steps;

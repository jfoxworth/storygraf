import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const CardItem = ({ cardTitle, cardText }) => {
  return (
    <Row className="mt-3">
      <Col xs={{ span: 2 }}>
        <OuterDot>
          <InnerDot></InnerDot>
        </OuterDot>
      </Col>
      <Col xs={{ span: 10 }}>
        <CardItemTitle className={"titleFont"}>{cardTitle}</CardItemTitle>
        <CardItemText className={"bodyFont"}>{cardText}</CardItemText>
      </Col>
    </Row>
  );
};

const OuterDot = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: blue;
`;

const InnerDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  top: 10px;
  left: 10px;
`;

const CardItemTitle = styled.div``;

const CardItemText = styled.div`
  color: rgb(145, 147, 150);
`;

export default CardItem;

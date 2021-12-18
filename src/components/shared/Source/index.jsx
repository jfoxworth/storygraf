import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../main.css";

const Source = ({ source }) => {
  console.log(source);
  return (
    <Row>
      <Col xs="auto">
        <img
          src={`https://storygraf.s3.us-east-2.amazonaws.com/sources/${source.sourceImage}`}
          height={"40px"}
        />
      </Col>
    </Row>
  );
};

export default Source;

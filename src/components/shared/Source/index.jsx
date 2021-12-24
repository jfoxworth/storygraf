import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../main.css";

const Source = ({ source, size = "small" }) => {
  const imageSize = { small: 40, large: 80 };

  return (
    <Row>
      <Col xs="auto">
        <img
          src={`https://storygraf.s3.us-east-2.amazonaws.com/sources/${source.sourceImage}`}
          height={imageSize[size]}
        />
      </Col>
    </Row>
  );
};

export default Source;

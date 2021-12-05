import React from "react";
import { Row, Col } from "react-bootstrap";

const Source = ({ source }) => (
  <Row>
    <Col>{source.sourceName}</Col>
  </Row>
);

export default Source;

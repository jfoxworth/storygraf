import React from "react";
import { Row, Col } from "react-bootstrap";
import Source from "../Source";
import "../../../main.css";

const ArticleLine = ({ article }) => {
  return (
    <Row className="mb-3 ">
      <Col xs="auto">
        <Source source={article.source} />
      </Col>
      <Col xs="auto">{article.title}</Col>
    </Row>
  );
};

export default ArticleLine;

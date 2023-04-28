import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";

const CardItem = ({ cardTitle, cardText }) => {
  return (
    <Row className="mt-3">
      <Col xs={{ span: 2 }}>
        <div className={styles.outerDot}>
          <div className={styles.innerDot}></div>
        </div>
      </Col>
      <Col xs={{ span: 10 }}>
        <div className={`${styles.cardItemTitle} titleFont`}>{cardTitle}</div>
        <div className={`${styles.cardItemText} bodyFont`}>{cardText}</div>
      </Col>
    </Row>
  );
};

export default CardItem;

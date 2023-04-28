import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsStack } from "react-icons/bs";
import styles from "./styles.module.css";

const EmbedsBlock = ({ numEmbeds }) => {
  return (
    <div className={styles.styledEmbedWrapper}>
      <Row>
        <Col xs={{ span: 2 }}>
          <div className={styles.styledEmbedIcon}>
            <BsStack />
          </div>
        </Col>
        <Col xs={{ span: 10 }}>
          <div className={styles.styledEmbedText}>{numEmbeds} Embeds</div>
        </Col>
      </Row>
    </div>
  );
};

export default EmbedsBlock;

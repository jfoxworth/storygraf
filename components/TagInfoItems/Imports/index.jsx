import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import styles from "./styles.module.css";

const ImportsBlock = ({ numImports }) => {
  return (
    <div className={styles.styledImportWrapper}>
      <Row>
        <Col xs={{ span: 2 }}>
          <div className={styles.styledImportIcon}>
            <BsUpload />
          </div>
        </Col>
        <Col xs={{ span: 10 }}>
          <div className={styles.styledImportText}>{numImports} Imports</div>
        </Col>
      </Row>
    </div>
  );
};

export default ImportsBlock;

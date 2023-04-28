import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";

const HeroSection = () => {
  return (
    <div className={styles.slopedContainer}>
      <Container>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
          >
            <div className={`${styles.heroText} mt-8 pt-4 titleFont`}>
              Redefining News
            </div>
            <div className={`${styles.subText} mt-4 bodyFont greyText`}>
              The news is broken up into segmented pieces of info.
            </div>
            <div className={`${styles.subText} bodyFont greyText`}>
              Storygraf puts it in chronologocal order and gives it context -
              telling the full story.
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;

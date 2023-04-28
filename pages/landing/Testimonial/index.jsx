import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";

const Testimonial = () => {
  return (
    <div className={styles.slopedContainer}>
      <Container>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
          >
            <div className={`${styles.initialText} mt-8 pt-4 titleFont`}>
              What We DO
            </div>
            <div className={`${styles.quoteText} mt-4 bodyFont`}>"</div>
            <div className={`${styles.quotedText} bodyFont`}>
              Storygraf organizes indiviual news articles into a concise
              timeline conveying the full story.
            </div>
            <div className={`${styles.sourceText} mt-8 pt-4 titleFont`}>
              Joshua Foxworth - Founder
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Testimonial;

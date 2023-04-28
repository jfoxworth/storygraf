import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "../CardItem";
import styles from "./styles.module.css";

const ProblemStatement = () => {
  return (
    <Container>
      <Row>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          xl={{ span: 8, offset: 2 }}
        >
          <h3 className="font-weight-medium text-dark titleFont">
            The Solution
          </h3>
          <div className={`${styles.descText} bodyFont`}>
            Storygraf takes news from reputable sources and builds complete
            stories organized chronologically by subject using tags
          </div>
          <CardItem
            cardTitle={"Complete Info"}
            cardText={
              "Users can read a story from start to finish and see how it unfolded and how mistakes were introduced and corrected."
            }
          />
          <CardItem
            cardTitle={"Organized Stories"}
            cardText={
              "The graf provides a timeline for all events within a story as it unfolds, allowing users to see exactly what happened."
            }
          />
          <CardItem
            cardTitle={"Full Context"}
            cardText={
              "Not only can a reader see how a story unfolded, but they can also see related tags and read through those grafs."
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProblemStatement;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import CardItem from "../CardItem";
import DemoImage from "./DemoImage";

const HowItWorks = () => {
  return (
    <Container>
      <Row>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
        >
          <h3 className={"titleText mt-4 mb-4 text-center"}>How It Works</h3>
          <div className={`${styles.descText} bodyText greyText mt-4 mb-4`}>
            Storygraf is a list of embedded tags with each tag eventually
            encompassing all events for a person, place, or thing. Tags that
            encompass events also contain a list of articles which lay out an
            event from start to finish.
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          xl={{ span: 6, offset: 3 }}
        >
          <Row>
            <Col xs={{ span: 10, offset: 1 }} xl={{ span: 6, offset: 0 }}>
              <CardItem
                cardTitle={"Subjects are organized by tags"}
                cardText={
                  'A tag can be a person, a place, or an event and one tag can be embedded within another. The tag for a football player may be "Sports" > "Football" > (Team Name) > (Player Name) '
                }
              />
              <CardItem
                cardTitle={"Tags contain links to articles"}
                cardText={
                  "A tag is a set of children tags that each contain their own childnre as well as a list of articles from authoritative sources that lay out the story."
                }
              />
              <CardItem
                cardTitle={"Articles provide details"}
                cardText={
                  "Each article within a tag displays either that articles own description or a separate description which details the pertinent info provided by that article."
                }
              />
            </Col>
            <Col xs={{ span: 10, offset: 1 }} xl={{ span: 6, offset: 0 }}>
              <DemoImage />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HowItWorks;

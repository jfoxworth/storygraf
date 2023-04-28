/*
 
     This page displays the hard coded sources in storygraf.
     These are the sources from which a person can add a story. I 
     am working on a way for a user to add sources from other places
     on a contigent basis. However, this is how I plan to prevent
     porn and other items from being added to the site.
     
 */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Source from "../../components/Source";
import sourceData from "../../public/assets/sources.json";

const ListSources = () => {
  return (
    <Container>
      <Row className="mt-5"></Row>
      <Row>
        <h3 className={"text-center mt-5 mb-5"}>Approved Sources</h3>
      </Row>

      <Row>
        <Col xs={{ span: "12" }} md={{ span: "8", offset: "2" }}>
          <Row className={"mb-3"}>
            {sourceData.map((source, index) => (
              <Col xs={"3"} className={"mb-5"} key={`source${index}`}>
                <Source source={source} size={"wide"} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListSources;

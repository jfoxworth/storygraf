import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Source from "../../shared/Source";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { useSource } from "../../Contexts/SourceContext";

const ListSources = () => {
  let [listType, setListType] = useState("grid");
  const sourceData = useSource();

  return (
    <Container>
      <Row className="mt-5"></Row>
      <Row>
        <h3 className={"text-center mt-5 mb-5"}>Approved Sources</h3>
      </Row>

      <Row>
        <Col xs={"auto"}>
          <Button variant="light" onClick={() => setListType("grid")}>
            <BsFillGrid3X3GapFill />
          </Button>
        </Col>
        <Col xs={"auto"}>
          <Button variant="light" onClick={() => setListType("list")}>
            <BsList />
          </Button>
        </Col>
      </Row>

      {listType === "grid" && (
        <Row>
          <Col xs={{ span: "12" }} md={{ span: "8", offset: "2" }}>
            <Row className={"mb-3"}>
              {sourceData.map((source, index) => (
                <Col xs={"3"} className={"mb-5"} key={`source${index}`}>
                  <Source source={source} size={"large"} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {listType === "list" && (
        <Row>
          <Col xs={{ span: "12" }} md={{ span: "10", offset: "1" }}>
            {sourceData.map((source, index) => (
              <Row className={"mb-3"} key={`source${index}`}>
                <Col xs={"2"}>
                  <Source source={source} size={"large"} />
                </Col>
                <Col xs={"10"}>{source.data.description}</Col>
              </Row>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ListSources;

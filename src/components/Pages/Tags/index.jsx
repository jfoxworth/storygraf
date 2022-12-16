/*
*
    This is a one off page that holds the top level official
    tags for storygraf. These should be the highest level tags
    such as "sports" or "US Politics"  
*
*/

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TagChildren from "../../shared/TagChildren";

const Tags = () => {
  const [childData, setChildData] = useState([]);

  const getTagChildren = () => {
    fetch("http://localhost:3080/api/tag_children/PTAG/" + 0, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => setChildData(JSON.parse(data).Items));
  };

  useEffect(() => {
    getTagChildren();
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h1 className="accent-bottom text-center mb-3 pb-3">Tags</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                The tags below are the current top level tags. Click on any tag
                to see its articles and descendents
              </p>
            </Col>
          </Row>
          <Row className={"mt-5"}>
            <TagChildren childTags={childData} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Tags;

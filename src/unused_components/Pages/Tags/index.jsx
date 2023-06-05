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
import { getTagChildren } from "../../shared/utils/api/tag";

const Tags = () => {
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    getTagChildren(0).then((data) => setChildData(JSON.parse(data).Items));
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h1 className="accent-bottom text-center mb-3 mt-5 pb-3 titleFont">
                Offical Storygraf Tags
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="bodyFont greyText">
              <p>
                The tags below are the top level tags for storygraf. Within
                these tags, subjects are broken down into smaller and smaller
                tags and then into stories. You can follow a tag, embed it into
                your own grafs, or import its contents into one of your grafs.
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

import React from "react";
import { Row, Col } from "react-bootstrap";
import Tag from "../../../shared/Tag";

const TagGrid = ({ tagRels }) => {
  return (
    <Row>
      {tagRels.map((tagRel, index) => (
        <Col xs={"3"} className={"mx-1"} key={`${tagRel.id}${index}`}>
          <Tag tag={tagRel.childTag} />
        </Col>
      ))}
    </Row>
  );
};

export default TagGrid;

import React from "react";
import { Row, Col } from "react-bootstrap";
import Tag from "../Tag";

const TagChildrenTags = ({ childTags = [] }) => {
  return (
    <div className="pt-3">
      {childTags &&
        childTags
          .filter((tag) => tag.type === "TAG")
          .map((tag, j) => {
            return (
              <Row key={`childtag${j}`} className={"mb-3"}>
                <Col xs={{ span: 6 }} md={{ span: 4 }}>
                  <div style={{ display: "inline-block" }}>
                    <Tag tag={tag} />
                  </div>
                </Col>
                <Col xs={{ span: 6 }} md={{ span: 8 }}>
                  <div
                    className={"text-muted bodyFont"}
                    style={{ display: "inline-block" }}
                  >
                    {tag.data?.description}
                  </div>
                </Col>
              </Row>
            );
          })}
    </div>
  );
};

export default TagChildrenTags;

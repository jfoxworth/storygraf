import React from "react";
import { Row, Col } from "react-bootstrap";
import Tag from "../Tag";

const TagList = ({ tags = [] }) => {
  console.log(tags);
  return (
    <div className="pt-3">
      {tags &&
        tags
          .filter((tag) => tag.type === "TAG")
          .map((tag, j) => {
            return (
              <Row key={`childtag${j}`} className={"mb-3"}>
                <Col xs={{ span: 5 }} sm={{ span: 4 }} md={{ span: 3 }}>
                  <div style={{ display: "inline-block" }}>
                    <Tag tag={tag} />
                  </div>
                </Col>
                <Col xs={{ span: 7 }} sm={{ span: 8 }} md={{ span: 9 }}>
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

export default TagList;

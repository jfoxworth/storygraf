/*
    This component takes in an array of tags and displays a horizontal
    listing of those tags from top most parent down to the deepest child.
    The component is intended to show where a tag lies.

    The tags must have a parent id equal to another tags id for this to work

*/

import React from "react";
import { Row, Col } from "react-bootstrap";
import Tag from "../Tag";
import { BsArrowRightCircle } from "react-icons/bs";

const TagStack = ({ tagStack = [] }) => {
  let tags = tagStack;

  console.log("The tag stack is ...");
  console.log(JSON.stringify(tagStack));

  return (
    <Row>
      <Col>
        {tags?.map((tag, i) => (
          <div key={`tagTreeItem${tag.id}`} style={{ display: "inline-block" }}>
            <Tag tag={tag} variant={"inline"} />
            {i !== tags.length - 1 && (
              <BsArrowRightCircle
                style={{ marginRight: "0.2em", marginLeft: "0.2em" }}
              />
            )}
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default TagStack;

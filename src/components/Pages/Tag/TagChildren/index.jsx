/*
    This component calls the various components to display 
    the children for a tag.
*/

import React from "react";
import { Row, Col } from "react-bootstrap";
import TagArticles from "../../../shared/TagArticles";
import TagChildrenTags from "../../../shared/TagChildrenTags";

const TagChildren = ({ tag, childData }) => {
  return (
    <>
      <Row>
        <Col>
          {childData.length > 0 && (
            <>
              {/* Display child tags */}
              <TagChildrenTags
                childTags={childData.filter((tag) => tag.type === "TAG")}
              />
              {/* Display child articles */}
              <TagArticles
                articles={childData.filter((tag) => tag.type === "ARTICLE")}
                showEdits={true}
                tag={tag}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TagChildren;

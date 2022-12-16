/*
 *
    This component is the small block that contains the text of the tag and
    has the background color and text color for the tag. There is code there
    to display buttons to add an article or tag. This was intended to let
    a user add a child tag or article when viewing that tag as a child. I 
    think that I will deprecate this.
 *
 */

import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import { BsBookmarkPlus, BsFileEarmarkPlus } from "react-icons/bs";
import "../../../main.css";

const Tag = ({
  tag = {},
  showAdds = false,
  handleCreateTagClick = () => {},
  handleCreateArticleClick = () => {},
}) => {
  return (
    <Row className="pb-3 ">
      <Col xs="auto">
        <LinkContainer to={`/Tag/${tag.parent_tag_id}/${tag.id}`}>
          <h4>
            <div
              className={"sgtag"}
              style={{
                backgroundColor: tag.data?.tagColor
                  ? tag.data?.tagColor
                  : "#3a5199",
                color: tag.data?.textColor ? tag.data?.textColor : "#FFF",
              }}
            >
              {tag.data?.tagName}
            </div>
          </h4>
        </LinkContainer>
      </Col>
      {showAdds && (
        <>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              className="icon-button px-0 py-1"
              onClick={() => handleCreateTagClick(tag)}
            >
              <BsBookmarkPlus
                className="lead"
                style={{ position: "relative", top: "-3px" }}
              />
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              className="icon-button px-0 py-1"
              onClick={() => handleCreateArticleClick(tag)}
            >
              <BsFileEarmarkPlus
                className="lead"
                style={{ position: "relative", top: "-3px" }}
              />
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};

export default Tag;

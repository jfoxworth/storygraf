import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import { BsBookmarkPlus, BsFileEarmarkPlus } from "react-icons/bs";
import "../../../main.css";

const Tag = ({
  tag,
  showAdds = false,
  handleCreateTagClick = () => {},
  handleCreateArticleClick = () => {},
}) => {
  return (
    <Row className="pb-3 ">
      <Col xs="auto">
        <LinkContainer to={`/Tag/${tag.id}`}>
          <h4>
            <div
              className={"sgtag"}
              style={{
                backgroundColor: tag.data?.color ? tag.data?.color : "#3a5199",
                color: tag.data?.textcolor ? tag.data?.textcolor : "#FFF",
              }}
            >
              {tag.name}
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

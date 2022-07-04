import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsBookmarkPlus, BsFileEarmarkPlus, BsSignpost2 } from "react-icons/bs";
import CreateTagModal from "../../../shared/CreateTagModal";
import CreateArticleModal from "../../../shared/CreateArticleModal";
import EditTagModal from "../../../shared/EditTagModal";
import DateBlock from "../../../shared/DateBlock";

const TagInfo = ({ tag, userData, numChildren, numArticles, cumulatives }) => {
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [showEditTag, setShowEditTag] = useState(false);

  const handleEditTagClick = (tag) => {
    setShowEditTag(true);
  };

  const handleCreateTagClick = (tag) => {
    setShowCreateTag(true);
  };

  const handleCreateArticleClick = (tag) => {
    setShowCreateArticle(true);
  };

  return (
    <>
      {tag.id && (
        <EditTagModal
          show={showEditTag}
          onHide={() => setShowEditTag(false)}
          tag={tag}
          userdata={userData}
          setshowedittag={setShowEditTag}
        />
      )}

      {tag.id && (
        <CreateTagModal
          show={showCreateTag}
          onHide={() => setShowCreateTag(false)}
          parenttag={tag}
          userdata={userData}
          setshowcreatetag={setShowCreateTag}
        />
      )}

      {tag.id && (
        <CreateArticleModal
          show={showCreateArticle}
          setshowcreatearticle={setShowCreateArticle}
          onHide={() => setShowCreateArticle(false)}
          parenttag={tag}
          userdata={userData}
        />
      )}

      <Row className={"mt-3"}>
        <Col xs={{ order: 1 }} sm={{ order: 1 }}>
          <div className={"my-3 text-muted"}>{tag.data?.description}</div>
          <Row>
            <div className="mx-3 px-1 mt-3">
              <Row>
                <Col className={"text-center"}>
                  <Button
                    variant="outline-secondary"
                    className="icon-button px-0 py-1"
                    onClick={() => handleEditTagClick(tag)}
                  >
                    <BsSignpost2
                      className="lead"
                      style={{ position: "relative", top: "-3px" }}
                    />
                  </Button>
                  <div className={"text-muted"}>Edit Tag</div>
                </Col>
                <Col className={"text-center"}>
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
                  <div className={"text-muted"}>Add Child Tag</div>
                </Col>
                <Col className={"text-center"}>
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
                  <div className={"text-muted"}>Add Article</div>
                </Col>
              </Row>
              <Row>
                <h4 className={"mt-5 mb-3"}>Cumulative Items</h4>
                {!tag.data.cumulatives?.length && (
                  <div>There are no cumulative items for his tag.</div>
                )}
                {tag.data.cumulatives?.map((cumItem, i) => (
                  <div className={"text-muted"} key={`artKeyItem${i}`}>
                    {cumItem} - {cumulatives[cumItem]}
                  </div>
                ))}
              </Row>
            </div>
          </Row>
        </Col>
        <Col xs={{ order: 2 }} sm={{ order: 2 }}>
          <Row>
            <Col className={"bold right-text"}>
              <Row className="mt-3">
                <strong>Tag Type :</strong>
              </Row>
              <Row className="mt-3">
                <strong>Created :</strong>
              </Row>
              <Row className="mt-3">
                <strong>Articles :</strong>
              </Row>
              <Row className="mt-3">
                <strong>Child Tags :</strong>
              </Row>
            </Col>
            <Col className={"bold left-text"}>
              <Row className="mt-3">
                <span>{tag.type[0].toUpperCase() + tag.type.substring(1)}</span>
              </Row>
              <Row className="mt-3">
                <span>
                  <DateBlock dateString={tag.createdAt} />
                </span>
              </Row>
              <Row className="mt-3">
                <span>{numArticles}</span>
              </Row>
              <Row className="mt-3">
                <span>{numChildren}</span>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TagInfo;

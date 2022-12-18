import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsBookmarkPlus, BsFileEarmarkPlus, BsSignpost2 } from "react-icons/bs";
import CreateTagModal from "../../../shared/CreateTagModal";
import CreateArticleModal from "../../../shared/CreateArticleModal";
import EditTagModal from "../../../shared/EditTagModal";
import DateBlock from "../../../shared/DateBlock";
import Tag from "../../../shared/Tag";

const TagInfo = ({ tag, userData, cumulatives = [], addChildItem }) => {
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [showEditTag, setShowEditTag] = useState(false);
  const [showDesc, setShowDesc] = useState(tag.data?.description);

  const handleEditTagClick = (tag) => {
    setShowEditTag(true);
  };

  const handleCreateTagClick = (tag) => {
    setShowCreateTag(true);
  };

  const handleCreateArticleClick = (tag) => {
    setShowCreateTag(true);
  };

  const tagType = tag?.data?.type || "No Type Set";

  return (
    <>
      {tag.id && (
        <EditTagModal
          show={showEditTag}
          onHide={() => setShowEditTag(false)}
          tag={tag}
          userdata={userData}
          setshowedittag={setShowEditTag}
          setShowDesc={setShowDesc}
        />
      )}

      {tag.id && (
        <CreateTagModal
          show={showCreateTag}
          onHide={() => setShowCreateTag(false)}
          parenttag={tag}
          userdata={userData}
          setshowcreatetag={setShowCreateTag}
          addChildItem={addChildItem}
        />
      )}

      {tag.id && (
        <CreateArticleModal
          show={showCreateArticle}
          setshowcreatearticle={setShowCreateArticle}
          onHide={() => setShowCreateArticle(false)}
          tag={tag}
          userdata={userData}
          addChildItem={addChildItem}
        />
      )}

      <Row className={"mt-3 titleFont"}>
        <Col xs={{ order: 1 }} sm={{ order: 1 }}>
          <div className={"my-3 text-muted"}>
            <span>
              {" "}
              <Tag
                tag={tag}
                handleCreateTagClick={() => {}}
                handleCreateArticleClick={() => {}}
                showAdds={false}
              />
            </span>
            {showDesc}
          </div>
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
            </div>
          </Row>
        </Col>
        <Col xs={{ order: 2 }} sm={{ order: 2 }}>
          <Row>
            <Col className={"bold right-text"}>
              <Row className="mt-3">
                <strong>Tag Owner :</strong>
              </Row>
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
                <span>Future Owner Name</span>
              </Row>
              <Row className="mt-3">
                <span>{tagType[0].toUpperCase() + tagType.substring(1)}</span>
              </Row>
              <Row className="mt-3">
                <span>
                  <DateBlock dateString={tag.created_at} />
                </span>
              </Row>
              <Row className="mt-3">
                <span>{tag.data.childArticles}</span>
              </Row>
              <Row className="mt-3">
                <span>{tag.data.childTags}</span>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TagInfo;

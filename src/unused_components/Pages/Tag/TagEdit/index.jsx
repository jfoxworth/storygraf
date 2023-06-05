/*
    This component displays the edit buttons for a tag. It
    is called from the tag page when a user's id matches the
    id of the tag being displayed.
*/

import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsBookmarkPlus, BsFileEarmarkPlus, BsSignpost2 } from "react-icons/bs";
import CreateTagModal from "../../../shared/CreateTagModal";
import CreateItemModal from "../../../shared/CreateItemModal";
import EditTagModal from "../../../shared/EditTagModal";
import { useUser } from "../../../Contexts/UserContext";
import styled from "styled-components";

const TagEdit = ({
  tag,
  cumulatives,
  setCumulatives,
  setThisTag,
  addChildItem,
  setShowDesc,
}) => {
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [showEditTag, setShowEditTag] = useState(false);
  const [actionText, setActionText] = useState("");
  const userData = useUser();

  const handleEditTagClick = (tag) => {
    setShowEditTag(true);
  };

  const handleCreateTagClick = (tag) => {
    setShowCreateTag(true);
  };

  const handleCreateArticleClick = (tag) => {
    setShowCreateArticle(true);
  };

  useEffect(() => {
    setShowDesc(tag?.data?.description);
  }, [tag, setShowDesc]);

  return (
    <>
      {tag.id && (
        <EditTagModal
          show={showEditTag}
          onHide={() => setShowEditTag(false)}
          tag={tag}
          setThisTag={setThisTag}
          userdata={userData}
          setshowedittag={setShowEditTag}
          setShowDesc={setShowDesc}
          cumulatives={cumulatives}
          setCumulatives={setCumulatives}
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
        <CreateItemModal
          show={showCreateArticle}
          setshowcreatearticle={setShowCreateArticle}
          onHide={() => setShowCreateArticle(false)}
          tag={tag}
          userdata={userData}
          addChildItem={addChildItem}
        />
      )}

      <Row className={"titleFont text-center mt-3"}>
        <Col>
          <Button
            variant="outline-danger"
            className="icon-button px-0 py-1"
            onClick={() => handleEditTagClick(tag)}
            onMouseEnter={() => setActionText("Edit Tag")}
            onMouseLeave={() => setActionText("")}
          >
            <BsSignpost2
              className="lead"
              style={{ position: "relative", top: "-3px" }}
            />
          </Button>
          <Button
            variant="outline-primary"
            className="icon-button  mx-3 px-0 py-1"
            onClick={() => handleCreateTagClick(tag)}
            onMouseEnter={() => setActionText("Add Child Tag")}
            onMouseLeave={() => setActionText("")}
          >
            <BsBookmarkPlus
              className="lead"
              style={{ position: "relative", top: "-3px" }}
            />
          </Button>
          <Button
            variant="outline-warning"
            className="icon-button px-0 py-1"
            onClick={() => handleCreateArticleClick(tag)}
            onMouseEnter={() => setActionText("Add Article")}
            onMouseLeave={() => setActionText("")}
          >
            <BsFileEarmarkPlus
              className="lead"
              style={{ position: "relative", top: "-3px" }}
            />
          </Button>
          <ActionText className={"text-muted mt-1"}>{actionText}</ActionText>
        </Col>
      </Row>
    </>
  );
};

const ActionText = styled.div`
  font-size: 0.7em;
  height: 20px;
`;

export default TagEdit;

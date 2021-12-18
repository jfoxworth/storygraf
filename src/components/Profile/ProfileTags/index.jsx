import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import TagWaterfall from "../../shared/TagWaterFall";
import CreateTagModal from "../../shared/CreateTagModal";
import CreateArticleModal from "../../shared/CreateArticleModal";
import { API } from "aws-amplify";
import { listTagRelations } from "../../../graphql/queries";
import "../../../main.css";

const ProfileTags = ({ userData }) => {
  let [showCreateTag, setShowCreateTag] = useState(false);
  let [showCreateArticle, setShowCreateArticle] = useState(false);
  let [tagRelData, setTagRelData] = useState([]);
  let [parentTag, setParentTag] = useState(null);

  const unstringData = (items) => {
    items.forEach((item) => {
      item.childTag.data = JSON.parse(item.childTag.data);
    });
    return items;
  };

  const getTags = async (event) => {
    await API.graphql({
      query: listTagRelations,
      filter: { parentId: { eq: 0 } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) =>
      setTagRelData(unstringData(data.data.listTagRelations.items))
    );
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleCreateTagClick = (parentTag) => {
    setParentTag(parentTag);
    setShowCreateTag(true);
  };

  const handleCreateArticleClick = (parentTag) => {
    setParentTag(parentTag);
    setShowCreateArticle(true);
  };

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        onHide={() => setShowCreateTag(false)}
        parenttag={parentTag}
        userdata={userData}
      />

      <CreateArticleModal
        show={showCreateArticle}
        onHide={() => setShowCreateArticle(false)}
        parenttag={parentTag}
        userdata={userData}
      />

      <Container>
        <Row className="mt-5">
          <Col>
            <h2 className="accent-bottom mb-3 pb-3">User Tags</h2>
          </Col>
        </Row>
        <Row className={"mt-3"}>
          <Col>
            <Button
              variant="success"
              onClick={() => handleCreateTagClick(null)}
            >
              Create New Tag
            </Button>{" "}
          </Col>
        </Row>
        <Row className={"mt-5"}>
          {tagRelData.map((tagRel) => (
            <TagWaterfall
              tag={tagRel.childTag}
              handleCreateTagClick={handleCreateTagClick}
              handleCreateArticleClick={handleCreateArticleClick}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProfileTags;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CreateTagModal from "../../../shared/CreateTagModal";
import TagChildren from "../../../shared/TagChildren";
import { listTagRelations } from "../../../../graphql/queries";
import "../../../../main.css";

const ProfileTags = ({ userData }) => {
  let [showCreateTag, setShowCreateTag] = useState(false);
  let [tagRelData, setTagRelData] = useState([]);
  let [parentTag, setParentTag] = useState({ id: 0 });

  const unstringData = (items) => {
    items.forEach((item) => {
      item.childTag.data = JSON.parse(item.childTag.data);
    });
    return items;
  };

  const getTags = async (event) => {
    /*
    await API.graphql({
      query: listTagRelations,
      variables: { filter: { parentId: { eq: "0" } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setTagRelData(unstringData(data.data.listTagRelations.items));
    });
    */
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleCreateTagClick = (parentTag) => {
    setParentTag(parentTag);
    setShowCreateTag(true);
  };

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        setshowcreatetag={setShowCreateTag}
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
              onClick={() => handleCreateTagClick({ id: 0 })}
            >
              Create New Tag
            </Button>{" "}
          </Col>
        </Row>
        <Row className={"mt-5"}>
          <TagChildren tag={parentTag} setNumChildren={() => {}} />
        </Row>
      </Container>
    </>
  );
};

export default ProfileTags;

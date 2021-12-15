import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import TagList from "./TagList";
import TagWaterfall from "../../shared/TagWaterFall";
import CreateTagModal from "../../shared/CreateTagModal";
import { API } from "aws-amplify";
import { listTagRelations } from "../../../graphql/queries";

const ProfileTags = () => {
  let [userData, setUserData] = useState({});
  let [showCreateTag, setShowCreateTag] = useState(false);
  let [tagRelData, setTagRelData] = useState([]);

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
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
    getTags();
  }, []);

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        onHide={() => setShowCreateTag(false)}
        parenttag={null}
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
            <Button variant="success" onClick={() => setShowCreateTag(true)}>
              Create New Tag
            </Button>{" "}
          </Col>
        </Row>
        <Row className={"mt-5"}>
          {tagRelData.map((tagRel) => (
            <TagWaterfall tag={tagRel.childTag} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProfileTags;

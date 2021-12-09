import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import TagList from "./TagList";
import CreateTagModal from "../shared/CreateTagModal";

const TagsPage = () => {
  let [userData, setUserData] = useState({});
  let [showCreateTag, setShowCreateTag] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
  }, []);

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        onHide={() => setShowCreateTag(false)}
        parentTag={null}
        userData={userData}
      />

      <Container>
        <Row className={"mt-5"}>
          <h2 className={"mt-5 text-center"}>Current Tags</h2>
        </Row>
        <Row className={"mt-3"}>
          <Col xs="10" md="4" lg="3" xl="2">
            <Button variant="success" onClick={() => setShowCreateTag(true)}>
              Create New Tag
            </Button>{" "}
          </Col>
        </Row>
        <Row className={"mt-5"}>
          <TagList parent={0} userData={userData} />
        </Row>
      </Container>
    </>
  );
};

export default TagsPage;

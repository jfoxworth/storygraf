import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listTags } from "../../graphql/queries";
import { Auth } from "aws-amplify";
import TagList from "./TagList";
import CreateTag from "./CreateTag";

const TagsPage = () => {
  let userData = "";
  Auth.currentAuthenticatedUser({ bypassCache: true }).then(
    (data) => (userData = data)
  );

  let [showCreateTag, setShowCreateTag] = useState(false);

  return (
    <Container>
      <Row className={"mt-5"}>
        <h2 className={"mt-5 text-center"}>Current Tags</h2>
      </Row>
      <Row className={"mt-3"}>
        <Col xs={3}>
          <Button
            variant="success"
            onClick={() => setShowCreateTag(!showCreateTag)}
          >
            Create New Tag
          </Button>{" "}
        </Col>
      </Row>
      {showCreateTag && (
        <Row className={"mt-5"}>
          <CreateTag parentId={0} />
        </Row>
      )}
      <Row classsName={"mt-5"}>
        <TagList parent={0} />
      </Row>
    </Container>
  );
};

export default TagsPage;

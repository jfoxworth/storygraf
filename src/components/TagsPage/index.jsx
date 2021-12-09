import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listTags } from "../../graphql/queries";
import { Auth } from "aws-amplify";
import TagList from "./TagList";
import CreateTag from "./CreateTag";
import CreateTagModal from "../shared/CreateTagModal";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

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

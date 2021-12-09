import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import FormDropdown from "../../shared/Forms/FormDropdown";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { createTag, createTagRelation } from "../../../graphql/mutations";
import { Auth } from "aws-amplify";

const CreateTagModal = (props) => {
  let [tagName, setTagName] = useState("");
  const handleChangeTagName = (event) => {
    setTagName(event.target.value);
  };

  let [tagType, setTagType] = useState("");
  const handleChangeTagType = (event) => {
    setTagType(event.target.value);
  };

  let [tagColor, setTagColor] = useState("#898989");
  const handleChangeTagColor = (event) => {
    setTagColor(event.target.value);
  };

  let [textColor, setTextColor] = useState("#FFFFFF");
  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
  };

  let [tagDescription, setTagDescription] = useState("");
  const handleChangeTagDescription = (event) => {
    setTagDescription(event.target.value);
  };

  const handleAddTag = (event) => {
    event.preventDefault();
    addTag(event).then((data) => {
      console.log(data);
      addTagRelation(
        data.data.createTag.id,
        props.parentTag ? props.parentTag.id : 0
      );
    });
  };

  const addTag = async (event) => {
    const input = {
      name: tagName,
      creatorId: props.userData.username,
      data: JSON.stringify({
        color: tagColor,
        textcolor: textColor,
        description: tagDescription,
      }),
      frontpage: true,
      official: true,
      type: tagType,
    };

    setTagName("");
    setTagColor("#898989");
    setTagType("");
    setTextColor("#FFFFFF");

    return await API.graphql({
      query: createTag,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  const addTagRelation = async (thisId, parentId) => {
    const input = {
      parentId: parentId,
      childId: thisId,
      creatorId: props.userData.username,
    };
    return await API.graphql({
      query: createTagRelation,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleAddTag}>
            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <FormInput
                  className="mt-5"
                  type="text"
                  name="tagName"
                  icon="Cube"
                  placeholder="Enter name for tag here"
                  label="Name and color for tag and then for text"
                  value={tagName}
                  handleChange={handleChangeTagName}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <FormDropdown
                  handleChange={handleChangeTagType}
                  options={[
                    { value: "event", label: "Event" },
                    { value: "person", label: "Person" },
                    { value: "place", label: "Place" },
                    { value: "thing", label: "Thing" },
                  ]}
                  label="Select type for tag"
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <Form.Group className="mb-3" controlId="tagDesc">
                  <Form.Label>Description of Tag</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleChangeTagDescription}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                {props.parentTag === null && (
                  <p>
                    This tag will be created and placed at the top level with no
                    parent. It can be included within any other tag or have tags
                    added beneath it.
                  </p>
                )}
                {props.parentTag !== null && (
                  <p>
                    This tag will be created and placed under the tag{" "}
                    {props.parentTag.name}. It can be included within any other
                    tag or have tags added beneath it.
                  </p>
                )}
              </Col>
            </Row>
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={handleAddTag}>
          Create Tag
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTagModal;

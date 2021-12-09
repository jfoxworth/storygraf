import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import FormDropdown from "../../shared/Forms/FormDropdown";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { API } from "aws-amplify";
import { createTag, createTagRelation } from "../../../graphql/mutations";
import { Auth } from "aws-amplify";

const CreateTag = ({ parentId }) => {
  let userData = "";
  Auth.currentAuthenticatedUser({ bypassCache: true }).then(
    (data) => (userData = data)
  );
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
      addTagRelation(data.data.createTag.id, parentId);
    });
  };

  const addTag = async (event) => {
    const input = {
      name: tagName,
      creatorId: userData.username,
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
      creatorId: userData.username,
    };
    return await API.graphql({
      query: createTagRelation,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  return (
    <>
      <Container>
        <form onSubmit={handleAddTag}>
          <Row>
            <Col xs={10}>
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

            <Col xs={1} className={"mt-4"}>
              <Form.Control
                type="color"
                onChange={handleChangeTagColor}
                id="tagcolor"
                defaultValue="#563d7c"
                title="Choose your color"
              />
            </Col>

            <Col xs={1} className={"mt-4"}>
              <Form.Control
                type="color"
                onChange={handleChangeTextColor}
                id="tagcolor"
                defaultValue="#FFFFFF"
                title="Choose the text color"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={10}>
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
            <Col xs={10} className={"mt-3"}>
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

          <Row className={"mt-3"}>
            <Col xs="4"></Col>
            <Col xs="4">
              <Button
                className="w-100"
                variant="primary"
                onClick={handleAddTag}
              >
                Create New Tag
              </Button>
            </Col>
            <Col xs="4"></Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default CreateTag;

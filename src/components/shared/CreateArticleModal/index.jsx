import React, { useState } from "react";
import FormInput from "../Forms/FormInput";
import FormDropdown from "../Forms/FormDropdown";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { createArticle, createTagArtCon } from "../../../graphql/mutations";

const CreateArticleModal = (props) => {
  let [articleTitle, setArticleTitle] = useState("");
  const handleChangeTitle = (event) => {
    setArticleTitle(event.target.value);
  };

  let [articleLink, setArticleLink] = useState("");
  const handleChangeLink = (event) => {
    setArticleLink(event.target.value);
  };

  let [articleData, setArticleData] = useState("");
  const handleChangeArticleData = (event) => {
    setArticleData(event.target.value);
  };

  const handleAddTag = (event) => {
    event.preventDefault();
    addArticle(event).then((data) => {
      console.log(data);
      addTagArtCon(data.data.createArticle.id, props.tag.id);
    });
  };

  const addArticle = async (event) => {
    const input = {
      title: articleTitle,
      link: articleLink,
      dateWritten: articleDate,
      data: JSON.stringify(articleData),
      creatorId: props.userData.username,
      approved: false,
      admin: false,
      sourceId: sourceId,
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

export default CreateArticleModal;

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

  let [articleDate, setArticleDate] = useState("");
  const handleChangeDate = (event) => {
    setArticleDate(event.target.value);
  };

  let [articleData, setArticleData] = useState("");
  const handleChangeArticleData = (event) => {
    setArticleData(event.target.value);
  };

  let [articleSource, setArticleSource] = useState("");
  const handleChangeSource = (event) => {
    setArticleSource(event.target.value);
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
      sourceId: articleSource.id,
    };

    return await API.graphql({
      query: createArticle,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  const addTagArtCon = async (thisId, tagId) => {
    const input = {
      tagId: tagId,
      articleId: thisId,
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
                  name="articleTitle"
                  icon="Cube"
                  placeholder="Title of article"
                  label="Enter the title for the article"
                  value={articleTitle}
                  handleChange={handleChangeTitle}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <FormInput
                  className="mt-5"
                  type="text"
                  name="articleLink"
                  icon="Cube"
                  placeholder="Link to article"
                  label="Enter the link to the article"
                  value={articleLink}
                  handleChange={handleChangeLink}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  value={articleDate}
                  handleChange={handleChangeDate}
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
                    onChange={handleChangeArticleData}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={handleAddTag}>
          Add Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateArticleModal;

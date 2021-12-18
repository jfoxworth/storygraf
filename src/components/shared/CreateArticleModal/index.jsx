import React, { useState, useEffect } from "react";
import FormInput from "../Forms/FormInput";
import FormDropdown from "../Forms/FormDropdown";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { createArticle } from "../../../graphql/mutations";
import { listSources } from "../../../graphql/queries";
import Source from "../Source";

const CreateArticleModal = (props) => {
  let [sourcesData, setSourcesData] = useState([]);
  let [sourceId, setSourceId] = useState("0000");
  let [source, setSource] = useState({});

  let [articleTitle, setArticleTitle] = useState("");
  const handleChangeTitle = (event) => {
    setArticleTitle(event.target.value);
  };

  let [articleLink, setArticleLink] = useState("");
  const handleChangeLink = (event) => {
    setArticleLink(event.target.value);
    setArticleSource(event.target.value);
  };

  let [articleDate, setArticleDate] = useState("");
  const handleChangeDate = (event) => {
    setArticleDate(event.target.value);
  };

  let [articleData, setArticleData] = useState("");
  const handleChangeArticleData = (event) => {
    setArticleData(event.target.value);
  };

  const handleAddTag = (event) => {
    event.preventDefault();
    addArticle(event).then((data) => {
      // close window
    });
  };

  const getSources = async (id) => {
    await API.graphql({
      query: listSources,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setSourcesData(data.data.listSources.items);
    });
  };

  useEffect(() => {
    getSources();
  }, []);

  const addArticle = async (event) => {
    const input = {
      title: articleTitle,
      link: articleLink,
      dateWritten: articleDate,
      data: JSON.stringify({ description: articleData }),
      creatorId: props.userdata.username,
      approved: false,
      admin: false,
      tagId: props.parenttag.id,
      sourceId: sourceId,
    };

    return await API.graphql({
      query: createArticle,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  const setArticleSource = (url) => {
    sourcesData.forEach((source, i) => {
      if (url.includes(source.sourceUrl)) {
        setSourceId(source.id);
        setSource(source);
      }
    });
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Article to Tag</Modal.Title>
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
                <Form.Group className="mb-3" controlId="tagDesc">
                  <Form.Label>Date article was written</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_article"
                    value={articleDate}
                    onChange={handleChangeDate}
                  />
                </Form.Group>
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

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <Row>
                  <Col xs={"auto"}>Source - </Col>
                  <Col xs={"auto"}>
                    {sourceId != "0000" && <Source source={source} />}
                  </Col>
                </Row>
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

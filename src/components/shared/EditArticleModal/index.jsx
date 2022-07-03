import React, { useState, useEffect } from "react";
import FormInput from "../Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { updateArticle } from "../../../graphql/mutations";
import { listSources } from "../../../graphql/queries";
import Source from "../Source";
import ArticleLine from "../ArticleLine";

const EditArticleModal = (props) => {
  let [article, setArticle] = useState(props.article);
  let [sourcesData, setSourcesData] = useState([]);
  let [sourceId, setSourceId] = useState("0000");
  let [source, setSource] = useState({});

  const handleChangeArticleDesc = (event) => {
    setArticle({
      ...article,
      data: { ...article.data, userDescription: event.target.value },
    });
  };

  const handleEditArticle = (event) => {
    event.preventDefault();
    editArticle(event).then((data) => {
      props.setshoweditarticle(false);
    });
  };

  /*
  const handleChangeBullets = (event) => {
    let bullets = articleData.bullets;
    bullets[event.target.name] = event.target.value;
    setArticleData({ ...articleData, bullets: bullets });
  };

  const addBulletPoint = (event) => {
    let bullets = articleData.bullets;
    bullets.push("New Bullet");
    setArticleData({ ...articleData, bullets: bullets });
  };
  */

  const editArticle = async (event) => {
    return await API.graphql({
      query: updateArticle,
      variables: { input: article },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleEditArticle}>
            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <h3>Link to Article</h3>
                <div className={"my-3"}>{article.data.url}</div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <ArticleLine article={article} showEdits={false} />
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <Form.Group className="mb-3" controlId="artDesc">
                  <Form.Label>Description of Article</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleChangeArticleDesc}
                    value={article.data.userDescription}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>

            {source.id && (
              <Row>
                <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                  <Row>
                    <Col xs={"auto"}>Source - </Col>
                    <Col xs={"auto"}>
                      {sourceId !== "0000" && <Source source={source} />}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshoweditarticle(false)}>Close</Button>
        <Button variant="success" onClick={handleEditArticle}>
          Edit Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditArticleModal;

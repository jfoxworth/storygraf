import React, { useState, useEffect } from "react";
import FormInput from "../Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { updateArticle } from "../../../graphql/mutations";
import { listSources } from "../../../graphql/queries";
import Source from "../Source";
import TimePicker from "react-bootstrap-time-picker";

const EditArticleModal = (props) => {
  let [sourcesData, setSourcesData] = useState([]);
  let [sourceId, setSourceId] = useState("0000");
  let [source, setSource] = useState({});

  let [articleTitle, setArticleTitle] = useState(props.article.title);
  const handleChangeTitle = (event) => {
    setArticleTitle(event.target.value);
  };

  let [articleLink, setArticleLink] = useState(props.article.link);
  const handleChangeLink = (event) => {
    setArticleLink(event.target.value);
    setArticleSource(event.target.value);
  };

  let [articleDate, setArticleDate] = useState(props.article.dateWritten);
  const handleChangeDate = (event) => {
    setArticleDate(event.target.value);
  };

  let [articleData, setArticleData] = useState({
    description: props.article.data.description,
    time: props.article.data.time,
    bullets: props.article.data.bullets,
  });
  const handleChangeArticleDesc = (event) => {
    setArticleData({ ...articleData, description: event.target.value });
  };
  const handleChangeTimeData = (event) => {
    setArticleData({ ...articleData, time: event });
  };
  const handleChangeBullets = (event) => {
    let bullets = articleData.bullets;
    bullets[event.target.name] = event.target.value;
    setArticleData({ ...articleData, bullets: bullets });
  };

  const handleEditArticle = (event) => {
    event.preventDefault();
    editArticle(event).then((data) => {
      props.setshoweditarticle(false);
    });
  };

  const addBulletPoint = (event) => {
    let bullets = articleData.bullets;
    bullets.push("New Bullet");
    setArticleData({ ...articleData, bullets: bullets });
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

  const editArticle = async (event) => {
    let dateString = articleDate.split("-");
    let hour = Math.floor(articleData.time / 3600) % 12;
    let minute = Math.floor((articleData.time % 3600) / 60);
    let thisDateTime = new Date(
      dateString[0],
      dateString[1],
      dateString[2],
      hour,
      minute
    );
    const input = {
      id: props.article.id,
      title: articleTitle,
      link: articleLink,
      dateWritten: articleDate,
      articleDate: thisDateTime,
      data: JSON.stringify(articleData),
      creatorId: props.userdata.username,
      approved: false,
      admin: false,
      tagId: props.article.tagId,
      sourceId: props.article.sourceId,
    };

    return await API.graphql({
      query: updateArticle,
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
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleEditArticle}>
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
                <Form.Group className="mb-3" controlId="artDate">
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
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <Form.Group className="mb-3" controlId="artTime">
                  <Form.Label>Time article was written</Form.Label>
                  <TimePicker
                    start="0:00"
                    end="24:00"
                    step={5}
                    value={articleData.time}
                    onChange={handleChangeTimeData}
                  />
                </Form.Group>
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
                    value={articleData.description}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>

            {articleData.bullets.map((bullet, j) => (
              <Row>
                <Col xs={12} lg={{ span: 8, offset: 2 }}>
                  <FormInput
                    className="mt-5"
                    type="text"
                    name={j}
                    icon="Cube"
                    placeholder="Bullet Point"
                    label={`Bullet point ${j + 1}`}
                    value={bullet}
                    handleChange={handleChangeBullets}
                  />
                </Col>
              </Row>
            ))}
            <Row>
              <Col xs={12} lg={{ span: 4, offset: 4 }}>
                <Button onClick={() => addBulletPoint()}>
                  Add Bullet Point
                </Button>
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

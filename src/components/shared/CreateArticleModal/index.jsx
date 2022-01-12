/*  This is the modal popup that is used to pull in data from 
    an article that is being submitted and prep that data
    to display that article on the site. The server must
    be running either locally or on AWS (in the future).
    The user enters a URL and the code pulls all available 
    data. If there is no date, no description, whatever, then
    the code gives the user a change to enter that data 
    prior to saving the data.

    The article must be from an approved source before it can 
    be submitted.
*/
import React, { useState, useEffect } from "react";
import FormInput from "../Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { createArticle } from "../../../graphql/mutations";
import { listSources } from "../../../graphql/queries";
import Source from "../Source";
import TimePicker from "react-bootstrap-time-picker";
const axios = require("axios");

const CreateArticleModal = (props) => {
  let [sourcesData, setSourcesData] = useState([]);
  let [sourceId, setSourceId] = useState("0000");
  let [source, setSource] = useState({});
  let [articleTitle, setArticleTitle] = useState("");
  let [articleLink, setArticleLink] = useState("");
  let [articleDate, setArticleDate] = useState("");
  let [articleData, setArticleData] = useState({
    description: {},
    time: 0,
    bullets: [],
  });
  let [approval, setApproval] = useState(false);
  let [hasTitle, setHasTitle] = useState(true);
  let [hasDesc, setHasDesc] = useState(true);
  let [hasDate, setHasDate] = useState(true);

  const handleChangeTitle = (event) => {
    setArticleTitle(event.target.value);
  };

  const handleChangeLink = (event) => {
    setArticleSource(event.target.value);
    axios({
      url: "http://localhost:3001/scrape",
      method: "post",
      data: {
        url: event.target.value,
      },
    }).then(({ data }) => {
      console.log(data);
      setArticleData({
        ...articleData,
        description: data.description,
        title: data.title,
        url: data.url,
        content_tier: data.content_tier,
        image: data.image,
        keywords: data.keywords,
        locale: data.locale,
        site_name: data.site_name,
        opinion: data.opinion,
        modified_time: data.modified_time,
        published_time: data.published_time,
        modified: data.modified,
        published: data.published,
        type: data.type,
      });
      setArticleLink(data.url ? data.url : event.target.value);
      setArticleTitle(data.title ? data.title : articleTitle);
      const time = data.published_time
        ? data.published_time
        : data.published
        ? data.published
        : articleDate;
      setArticleDate(time);
    });
  };

  const handleChangeDate = (event) => {
    setArticleDate(event.target.value);
  };

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

  const handleAddArticle = (event) => {
    event.preventDefault();
    addArticle(event).then((data) => {
      props.setshowcreatearticle(false);
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

  const addArticle = async (event) => {
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
      title: articleTitle,
      link: articleLink,
      dateWritten: articleDate,
      articleDate: thisDateTime,
      data: JSON.stringify(articleData),
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
        <Modal.Title>Add Article to Tag - {props.parenttag.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleAddArticle}>
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

            {!source.id && (
              <Row>
                <Col xs={12}>
                  All articles must come from an approved source.
                </Col>
              </Row>
            )}

            {source.id && (
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
            )}
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshowcreatearticle(false)}>Close</Button>
        <Button
          disabled={!source.id}
          variant="success"
          onClick={handleAddArticle}
        >
          Add Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateArticleModal;

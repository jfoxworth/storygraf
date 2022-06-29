/*  This is the modal popup that is used to pull in data from 
    an article that is being submitted and prep that data
    to display that article on the site. The server must
    be running either locally or on AWS (in the future).
    The user enters a URL and the code pulls all available 
    data. If there is no date, no description, whatever, then
    the code gives the user a chance to enter that data 
    prior to saving the article.

    The article must be from an approved source before it can 
    be submitted.
*/
import React, { useState, useEffect } from "react";
import FormInput from "../Forms/FormInput";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { createArticle } from "../../../graphql/mutations";
import { listSources } from "../../../graphql/queries";
import ArticleBlock from "../ArticleBlock";
const axios = require("axios");

const CreateArticleModal = (props) => {
  const [sourcesData, setSourcesData] = useState([]);
  const [source, setSource] = useState({});
  const [articleLink, setArticleLink] = useState("");

  const [article, setArticle] = useState({
    link: "",
    title: "",
    dateWritten: new Date(),
    articleDate: new Date(),
    data: {
      description: "",
      title: "",
      url: "",
      content_tier: "",
      image: "",
      keywords: "",
      locale: "",
      site_name: "",
      opinion: false,
      modified_time: new Date(),
      published_time: new Date(),
      modified: new Date(),
      published: new Date(),
      type: "article",
      bullets: [],
    },
    approved: false,
    admin: false,
    tagId: props.parenttag.id,
    creatorId: props.userdata.username,
    sourceId: "",
  });

  const handleChangeLink = (event) => {
    setArticleSource(event.target.value);
    setArticleLink(event.target.value);
    axios({
      url: "http://localhost:3001/scrape",
      method: "post",
      data: {
        url: event.target.value,
      },
    }).then(({ data }) => {
      console.log("----------------------------------");
      console.log(data);
      setArticle({
        ...article,
        link: data.url ? data.url : event.target.value,
        title: data.title,
        articleDate: new Date(data.published_time)
          ? new Date(data.published_time)
          : new Date(data.published)
          ? new Date(data.published)
          : new Date(),
        dateWritten: new Date(data.published_time)
          ? new Date(data.published_time)
          : new Date(data.published)
          ? new Date(data.published)
          : new Date(),
        data: {
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
          bullets: [],
        },
        tagId: props.parenttag.id,
        creatorId: props.userdata.username,
        sourceId: source.id,
      });
    });
  };

  const handleChangeBullets = (event) => {
    let bullets = article.data.bullets;
    bullets[event.target.name] = event.target.value;
    setArticle({ ...article, data: { ...article.data, bullets: bullets } });
  };

  const handleAddArticle = (event) => {
    event.preventDefault();
    addArticle(event).then((data) => {
      props.setshowcreatearticle(false);
    });
  };

  const addBulletPoint = (event) => {
    let bullets = article.data.bullets;
    bullets.push("New Bullet");
    setArticle({ ...article, data: { ...article.data, bullets: bullets } });
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
    console.log(article);
    return await API.graphql({
      query: createArticle,
      variables: { input: { ...article, data: JSON.stringify(article.data) } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  const setArticleSource = (url) => {
    sourcesData.forEach((source, i) => {
      if (url.includes(source.sourceUrl)) {
        setSource(source);
        setArticle({ ...article, sourceId: source.id });
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

            {article.data.bullets.map((bullet, j) => (
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

            {source.id && (
              <Row className="mt-3 text-center">
                <Col>
                  <Button onClick={() => addBulletPoint()}>
                    Add Bullet Point
                  </Button>
                </Col>
              </Row>
            )}

            {!source.id && (
              <Row className="mt-3 text-center">
                <Col xs={12}>
                  <h5>All articles must come from an approved source.</h5>
                </Col>
              </Row>
            )}

            {source.id && (
              <Row className="mt-3 margin:auto">
                <Col xs={"12"} md={{ span: 8, offset: 2 }}>
                  <ArticleBlock article={article} />
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

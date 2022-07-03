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
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { createArticle } from "../../../graphql/mutations";
import { listSources } from "../../../graphql/queries";
import ArticleLine from "../ArticleLine";
const axios = require("axios");

const CreateArticleModal = (props) => {
  const [sourcesData, setSourcesData] = useState([]);
  const [source, setSource] = useState({});
  const [articleLink, setArticleLink] = useState("");
  const [userDescription, setUserDescription] = useState("");

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
    try {
      axios({
        url: "http://localhost:3001/scrape",
        method: "post",
        data: {
          url: event.target.value,
        },
      }).then(({ data }) => {
        const url = data.ogUrl ? data.ogUrl : event.target.value;
        const title = data.ogTitle
          ? data.ogTitle
          : data.dcTitle
          ? data.dcTitle
          : data.twitterTitle
          ? data.twitterTitle
          : "";
        const articleDate = data.articlePublishedTime
          ? new Date(data.articlePublishedTime)
          : data.ogDate
          ? new Date(data.ogDate)
          : data.dcDate
          ? new Date(data.dcDate)
          : new Date();
        const description = data.ogDescription
          ? data.ogDescription
          : data.dcDescription
          ? data.dcDescription
          : "";
        const image = data.ogImage;
        const site_name = data.ogSiteName
          ? data.ogSiteName
          : data.dcPublisher
          ? data.dcPublisher
          : data.dcSource
          ? data.dcSource
          : "";
        const type = data.ogType ? data.ogType : "";
        const author = data.dcCreator;
        let artSource = "";
        sourcesData.forEach((source, i) => {
          if (url.includes(source.sourceUrl)) {
            artSource = source;
            setSource(source);
          }
        });
        setArticle({
          ...article,
          link: url,
          title: title,
          articleDate: articleDate,
          data: {
            description: description,
            title: title,
            url: url,
            image: image,
            site_name: site_name,
            modified: articleDate,
            published: articleDate,
            type: type,
            author: author,
            source: artSource,
            userDescription: "",
            ...data,
          },
          tagId: props.parenttag.id,
          creatorId: props.userdata.username,
          sourceId: source.id,
          approved: false,
          admin: false,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeBullets = (event) => {
    let bullets = article.data.bullets;
    bullets[event.target.name] = event.target.value;
    setArticle({ ...article, data: { ...article.data, bullets: bullets } });
  };

  const handleChangeDescription = (event) => {
    setUserDescription(event.target.value);
    setArticle({
      ...article,
      data: { ...article.data, userDescription: event.target.value },
    });
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
    const input = {
      ...article,
      data: JSON.stringify(article.data),
      sourceId: source.id,
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

            {!source.id && articleLink.length > 0 && (
              <Row className="mt-3 text-center">
                <Col xs={12}>
                  <h5>All articles must come from an approved source.</h5>
                </Col>
              </Row>
            )}

            {source.id && (
              <Row className="mt-3 margin:auto">
                <Col xs={"12"} md={{ span: 8, offset: 2 }}>
                  <ArticleLine article={article} />
                </Col>
              </Row>
            )}

            <Row>
              <Col xs={"12"} md={{ span: 8, offset: 2 }}>
                <Form.Label className="mt-5">Description of Article</Form.Label>
                <Form.Control
                  as="textarea"
                  name={"userDescription"}
                  placeholder="Your description of article"
                  label={`Your description of article`}
                  rows={5}
                  handleChange={handleChangeDescription}
                  value={userDescription}
                />
              </Col>
            </Row>
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

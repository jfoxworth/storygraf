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
import ArticleLine from "../ArticleLine";
import { BsXLg } from "react-icons/bs";
import { useSource } from "../../Contexts/SourceContext";

const CreateArticleModal = (props) => {
  const sourceData = useSource();
  const [source, setSource] = useState({});
  const [articleLink, setArticleLink] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const [article, setArticle] = useState({
    link: "",
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
      title: "",
      modified_time: new Date(),
      published_time: new Date(),
      modified: new Date(),
      published: new Date(),
      tagId: props.tag.parent_tag_id,
    },
    creatorId: props.userdata?.username,
    sourceId: "",
  });

  const handleChangeLink = (event) => {
    console.log(event.target.value);
    setArticleSource(event.target.value);
    setArticleLink(event.target.value);
    fetch("http://localhost:3001/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: event.target.value,
      }),
      params: JSON.stringify({
        url: event.target.value,
      }),
    })
      .then((response) => response.text())
      .then((rawdata) => {
        const data = JSON.parse(rawdata);
        console.log(data);
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
        sourceData.forEach((source, i) => {
          if (url.includes(source.data.sourceUrl)) {
            artSource = source;
            setSource(source);
          }
        });
        setArticle({
          ...article,
          articleDate: articleDate,
          data: {
            ...data,
            title: title,
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
          },
          parent_tag_id: props.tag.id,
          creatorId: props.userdata?.username || "Creator ID",
          sourceId: artSource.id,
        });
      });
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

  const addArticle = async (event) => {
    fetch("http://localhost:3080/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: {
          ...article,
        },
      }),
    })
      .then((response) => response.text())
      .then((data) => props.addChildItem(JSON.parse(data)));
  };

  const setArticleSource = (url) => {
    sourceData.forEach((source, i) => {
      if (url.includes(source.data.sourceUrl)) {
        setSource(source);
        setArticle({ ...article, data: { ...article.data, source: source } });
      }
    });
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Article to Tag - {props.tag.data.tagName}</Modal.Title>
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
                  <ArticleLine article={article} parentTag={props.tag} />
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
                  onChange={handleChangeDescription}
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

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
import { BsXLg } from "react-icons/bs";
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
      cumulatives: [],
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
            cumulatives: cumulatives,
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

  const getSources = async (id) => {
    await API.graphql({
      query: listSources,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setSourcesData(data.data.listSources.items);
    });
  };

  let [cumulatives, setCumulatives] = useState([]);
  const handleAddCumulative = (event) => {
    setCumulatives(
      cumulatives.concat([{ text: "Cumulative Property", value: 0 }])
    );
  };

  const handleCumulativeChange = (event) => {
    let temp = [];
    cumulatives.forEach((cumItem) => {
      temp.push(cumItem);
    });
    if (event.target.name.match("cumulativetext")) {
      const index = parseInt(event.target.name.replace("cumulativetext", ""));
      temp[index]["text"] = event.target.value;
    }
    if (event.target.name.match("cumulativevalue")) {
      const index = parseInt(event.target.name.replace("cumulativevalue", ""));
      temp[index]["value"] = event.target.value;
    }
    setCumulatives(temp);
  };
  const handleDeleteCumulative = (index) => {
    let temp = [];
    cumulatives.forEach((cumItem) => {
      temp.push(cumItem);
    });
    temp.splice(index, 1);
    setCumulatives(temp);
  };

  let [keyPoints, setKeyPoints] = useState([]);
  const handleAddKeyPoint = (event) => {
    setKeyPoints(keyPoints.concat(["Key Point"]));
  };

  const handleKeyPointChange = (event) => {
    let temp = [];
    keyPoints.forEach((cumItem) => {
      temp.push(cumItem);
    });
    const index = parseInt(event.target.name.replace("keypoint", ""));
    temp[index] = event.target.value;
    setKeyPoints(temp);
  };

  const handleDeleteKeyPoint = (index) => {
    let temp = [];
    keyPoints.forEach((kp) => {
      temp.push(kp);
    });
    temp.splice(index, 1);
    setKeyPoints(temp);
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
                  <ArticleLine article={article} parentTag={props.parenttag} />
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

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <h5 className={"mt-3"}>Key Points</h5>
                {keyPoints.map((kp, i) => (
                  <Row className={"p-0 m-0"} key={`keypoint${i}`}>
                    <Col xs={10}>
                      <FormInput
                        name={`keypoint${i}`}
                        icon="Cube"
                        value={kp}
                        className={"m-0 p-0"}
                        handleChange={handleKeyPointChange}
                      />
                    </Col>
                    <Col xs={2}>
                      <Button
                        variant="outline-secondary"
                        className="icon-button px-0 py-1 mt-4"
                        onClick={() => handleDeleteKeyPoint(i)}
                      >
                        <BsXLg
                          className="lead"
                          style={{ position: "relative", top: "-3px" }}
                        />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  variant={"success"}
                  className={"mb-3"}
                  onClick={handleAddKeyPoint}
                >
                  Add Key Point
                </Button>
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <h5 className={"mt-3"}>Cumulative Items</h5>
                {cumulatives?.map((cumItem, i) => (
                  <Row key={`cumulativetext${i}`}>
                    <Col xs={5}>
                      <FormInput
                        name={`cumulativetext${i}`}
                        icon="Cube"
                        value={cumItem.text}
                        className={"mb-1"}
                        handleChange={handleCumulativeChange}
                      />
                    </Col>
                    <Col xs={5}>
                      <FormInput
                        name={`cumulativevalue${i}`}
                        icon="Cube"
                        value={cumItem.value}
                        className={"mb-1"}
                        handleChange={handleCumulativeChange}
                      />
                    </Col>
                    <Col xs={2}>
                      <Button
                        variant="outline-secondary"
                        className="icon-button px-0 py-1 mt-4"
                        onClick={() => handleDeleteCumulative(i)}
                      >
                        <BsXLg
                          className="lead"
                          style={{ position: "relative", top: "-3px" }}
                        />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button variant={"success"} onClick={handleAddCumulative}>
                  Add Cumulative
                </Button>
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

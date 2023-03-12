import React, { useState } from "react";
import FormInput from "../Forms/FormInput";
import { Row, Col, Button, Modal } from "react-bootstrap";
import ArticleLine from "../ArticleLineEdit";
import Steps from "../Steps";
import { BsXLg } from "react-icons/bs";
import { updateArticle } from "../utils/api/item";

const EditArticleModal = (props) => {
  let [article, setArticle] = useState(props.article);
  const [step, setStep] = useState(0);
  const steps = ["Date", "Points", "Cumulatives"];

  const handleAddCumulative = (event) => {
    let temp = article.data.cumulatives ? article.data.cumulatives : [];
    temp.push({ text: "New Cumulative", value: 0 });
    setArticle({
      ...article,
      data: { ...article.data, cumulatives: temp },
    });
  };
  const handleCumulativeChange = (event) => {
    let temp = [];
    article.data.cumulatives?.forEach((cumItem) => {
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
    setArticle({
      ...article,
      data: { ...article.data, cumulatives: temp },
    });
  };
  const handleDeleteCumulative = (index) => {
    let temp = article.data.cumulatives;
    temp.splice(index, 1);
    setArticle({
      ...article,
      data: { ...article.data, cumulatives: temp },
    });
  };

  const handleAddKeyPoint = (event) => {
    let temp = article.data.keyPoints ? article.data.keyPoints : [];
    temp.push("Key Point");
    setArticle({
      ...article,
      data: { ...article.data, keyPoints: temp },
    });
  };
  const handleKeyPointChange = (event) => {
    let temp = [];
    article.data.keyPoints?.forEach((kp) => {
      temp.push(kp);
    });
    const index = parseInt(event.target.name.replace("keypoint", ""));
    temp[index] = event.target.value;
    setArticle({
      ...article,
      data: { ...article.data, keyPoints: temp },
    });
  };
  const handleDeleteKeyPoint = (index) => {
    let temp = article.data.keyPoints;
    temp.splice(index, 1);
    setArticle({
      ...article,
      data: { ...article.data, keyPoints: temp },
    });
  };

  const handleEditArticle = (event) => {
    event.preventDefault();
    updateArticle(article).then((data) => {
      props.setshoweditarticle(false);
    });
  };

  return (
    <Modal {...props} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditArticle}>
          <Row>
            <Col xs={12} lg={{ span: 8, offset: 2 }}>
              <h3>Link to Article</h3>
              <div className={"my-3"}>{article.data.url}</div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={{ span: 8, offset: 2 }}>
              <ArticleLine
                article={article}
                showEdits={false}
                parentTag={props.tag}
              />
            </Col>
          </Row>

          <Steps step={step} setStep={setStep} steps={steps} />
          {step === 1 && (
            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <h5 className={"mt-3"}>User Points</h5>
                {article.data.userPoints?.map((kp, i) => (
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
          )}

          {step === 2 && (
            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <h4>Cumulative Items</h4>
                {article.data.cumulatives?.map((cumItem, i) => (
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
          )}
        </form>
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

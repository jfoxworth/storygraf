import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Source from "../Source";
import "../../../main.css";
import { BsFillTrashFill, BsGear } from "react-icons/bs";
import { deleteArticle } from "../../../graphql/mutations";
import { API } from "aws-amplify";
import DateBlock from "./dateBlock";
import EditArticleModal from "../EditArticleModal";

const ArticleLine = ({ article, userData, showEdits = false, tag = {} }) => {
  const [as, setAs] = useState(true);
  const [showEditArticle, setShowEditArticle] = useState(false);
  let artData =
    typeof article.data === "string" ? JSON.parse(article.data) : article.data;

  const deleteThisArticle = async (id) => {
    return await API.graphql({
      query: deleteArticle,
      variables: { input: { id: id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then(setAs(false));
  };

  const editThisArticle = async (id) => {
    return await API.graphql({
      query: deleteArticle,
      variables: { input: { id: id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then(setAs(false));
  };

  return (
    <>
      <EditArticleModal
        show={showEditArticle}
        setshoweditarticle={setShowEditArticle}
        onHide={() => setShowEditArticle(false)}
        article={article}
        userdata={userData}
        parentTag={tag}
      />

      {as && (
        <Row className={"mb-3"}>
          <Col xs={{ span: 4 }} lg={{ span: 4 }}>
            <div
              style={{
                minWidth: "100px",
                backgroundImage: "url(" + article?.data?.image?.url + ")",
                minHeight: "100px",
                backgroundSize: "cover",
                borderRadius: "5px 5px 5px 5px",
              }}
            >
              {showEdits && (
                <div className={"p-2 d-flex justify-content-between"}>
                  <Button
                    variant="outline-secondary"
                    className="icon-button px-0 py-1 ml-5"
                    style={{
                      fontSize: "0.8em",
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => deleteThisArticle(article.id)}
                  >
                    <BsFillTrashFill />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="icon-button px-0 py-1 ml-5"
                    style={{ fontSize: "0.8em", width: "30px", height: "30px" }}
                    onClick={() => setShowEditArticle(true)}
                  >
                    <BsGear />
                  </Button>
                </div>
              )}
            </div>
          </Col>

          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            <Row>
              <Col xs={{ span: 10 }} md={{ span: 10 }}>
                <div
                  className={"text-weight-bold"}
                  style={{ fontSize: "0.9em" }}
                >
                  {article?.data?.title}
                </div>
              </Col>
              <Col className={"right-text"} xs={{ span: 2 }} md={{ span: 2 }}>
                <Source source={article?.data?.source || article?.source} />
              </Col>
            </Row>
            <Row className={"my-1"}>
              <Col xs={{ span: 6 }} md={{ span: 6 }}>
                <DateBlock
                  datestring={article?.data?.published}
                  time={artData}
                  articleid={article?.id}
                />
              </Col>
            </Row>
            <Row>
              <div className={"text-muted"} style={{ fontSize: "0.7em" }}>
                {article?.data?.userDescription
                  ? article.data.userDescription
                  : article?.data?.description}
              </div>
            </Row>
            <Row className={"my-3"}>
              <Col>
                {article.data?.cumulatives?.map((cumItem, i) => (
                  <Row key={`cumulative${i}`}>
                    <div className={"text-muted"} style={{ fontSize: "0.7em" }}>
                      {cumItem.text} - {cumItem.value}
                    </div>
                  </Row>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ArticleLine;

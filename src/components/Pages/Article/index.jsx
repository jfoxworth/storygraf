import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useParams } from "react-router-dom";
import { getArticle } from "../../../graphql/queries";
import { API } from "aws-amplify";
import Source from "../../shared/Source";
import EditArticleModal from "../../shared/EditArticleModal";

const ArticlePage = (props) => {
  let [article, setThisArticle] = useState({});
  let [userData, setUserData] = useState({});
  let [showEditArticle, setShowEditArticle] = useState(false);
  const params = useParams();

  const getThisArticle = async (id) => {
    await API.graphql({
      query: getArticle,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let articleData = data.data.getArticle;
      articleData.data = JSON.parse(articleData.data);
      setThisArticle(articleData);
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
    getThisArticle(params.articleId);
  }, [params.articleId, showEditArticle]);

  return (
    <>
      {article.id && (
        <EditArticleModal
          show={showEditArticle}
          setshoweditarticle={setShowEditArticle}
          onHide={() => setShowEditArticle(false)}
          article={article}
          userdata={userData}
        />
      )}

      {article.id && (
        <Container>
          <Row className={"mt-5"}></Row>
          <Row>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
              <Row className="mt-5">
                <Col>
                  <h2 className="accent-bottom mb-3 pb-3">
                    Article Information
                  </h2>
                  <Card>
                    <Card.Header as="h5">Article Data</Card.Header>
                    <Card.Body>
                      <Card.Title>Title : {article.title}</Card.Title>
                      <Card.Text>
                        Description : {article.data.description}
                      </Card.Text>
                      <Card.Text>
                        Article Date : {article.articleDate}
                      </Card.Text>
                      <Card.Text>Date Added : {article.createdAt}</Card.Text>
                      <Card.Text>
                        <Button
                          onClick={() => {
                            setShowEditArticle(true);
                          }}
                        >
                          Edit Article
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className={"mt-5"}>
                    <Card.Header as="h5">Article Source</Card.Header>
                    <Card.Body>
                      <Card.Title>{article.source.sourceName}</Card.Title>
                      <Card.Text>{article.source.description}</Card.Text>
                      <Source source={article.source} size={"large"} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ArticlePage;

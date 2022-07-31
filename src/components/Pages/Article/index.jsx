import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getArticle } from "../../../graphql/queries";
import EditArticleModal from "../../shared/EditArticleModal";
import ArticleLine from "../../shared/ArticleLine";

const ArticlePage = (props) => {
  let [article, setThisArticle] = useState({});
  let [userData, setUserData] = useState({});
  let [showEditArticle, setShowEditArticle] = useState(false);
  const params = useParams();

  const getThisArticle = async (id) => {
    /*
    await API.graphql({
      query: getArticle,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let articleData = data.data.getArticle;
      articleData.data = JSON.parse(articleData.data);
      setThisArticle(articleData);
    });
    */
  };

  useEffect(() => {
    /*
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
    getThisArticle(params.articleId);
    */
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
                  <h2 className="accent-bottom mb-3 pb-3">Article</h2>

                  <ArticleLine article={article} />

                  <Button
                    onClick={() => {
                      setShowEditArticle(true);
                    }}
                  >
                    Edit Article
                  </Button>

                  <h2 className="accent-bottom mt-5 mb-3 pb-3">Comments</h2>
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

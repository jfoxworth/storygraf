import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditArticleModal from "../../shared/EditArticleModal";
import ArticleLine from "../../shared/ArticleLineEdit";
import { useUser } from "../../Contexts/UserContext";

const ArticlePage = (props) => {
  let [article, setThisArticle] = useState({});
  let [showEditArticle, setShowEditArticle] = useState(false);
  const params = useParams();
  const userData = useUser();

  const getThisArticle = async (id) => {
    setThisArticle({});
  };

  useEffect(() => {
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

import React from "react";
import { Row, Col } from "react-bootstrap";
import DateBlock from "./DateBlock";
import { useUser } from "../../Contexts/UserContext";
import UserPoints from "./UserPoints";
import Cumulatives from "./Cumulatives";
import EditButtons from "./EditButtons";
import ArticleImage from "./ArticleImage";
import styles from "./styles.module.css";

const ArticleLine = ({
  article,
  parentTag = {},
  handleShowDeleteItem = () => {},
}) => {
  const userData = useUser();

  const deleteThisArticle = (article) => {
    handleShowDeleteItem(true, article);
  };

  return (
    <div className={styles.StyledWrapper}>
      <Row>
        <Col xs={{ span: 3 }} md={{ span: 2 }}>
          <ArticleImage article={article} />
        </Col>

        <Col xs={{ span: 9 }} md={{ span: 10 }} xl={{ span: 6 }}>
          <Row>
            <Col>
              <div className={`${styles.StyledTitle} text-weight-bold`}>
                {article?.data?.title}
              </div>
            </Col>
          </Row>
          <Row className={"mb-1"}>
            <Col>
              <div style={{ display: "flex" }}>
                <DateBlock article={article} />
                <Cumulatives
                  parentTag={parentTag}
                  cumulatives={article.data?.cumulatives}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 0 }} xl={{ span: 4 }} className="d-none d-xl-block">
          <Row>
            {!article.data?.userPoints?.length && (
              <div className={`${styles.StyledDescription} text-muted`}>
                {`${article?.data?.description?.substring(0, 50)} ...`}
              </div>
            )}
            {article.data?.userPoints?.length && (
              <UserPoints userPoints={article.data?.userPoints} />
            )}
          </Row>
        </Col>
      </Row>
      {/*
      {userData?.profileData.id === article.creatorId && (
            <Row>
              <EditButtons
                article={article}
                handleShowDeleteItem={handleShowDeleteItem}
              />
            </Row>
      )}
      */}
    </div>
  );
};

export default ArticleLine;

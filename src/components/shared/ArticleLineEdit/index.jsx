import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../main.css";
import DateBlock from "./dateBlock";
import styled from "styled-components";
import { useUser } from "../../Contexts/UserContext";
import UserPoints from "./UserPoints";
import Cumulatives from "./Cumulatives";
import EditButtons from "./EditButtons";
import ArticleImage from "./ArticleImage";

const ArticleLine = ({
  article,
  parentTag = {},
  variant = "left",
  handleShowEditArticle,
  handleShowDeleteItem,
}) => {
  const userData = useUser();

  const deleteThisArticle = (article) => {
    handleShowDeleteItem(true, article);
  };

  return (
    <StyledWrapper>
      <Row>
        <Col xs={{ span: 2 }} lg={{ span: 2 }}>
          <DateBlock article={article} />
          <Cumulatives
            parentTag={parentTag}
            cumulatives={article.data?.cumulatives}
          />
        </Col>
        <Col xs={{ span: 4 }} lg={{ span: 4 }}>
          <UserPoints userPoints={article.data?.userPoints} />
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col xs={{ span: 3 }}>
              <ArticleImage article={article} />
            </Col>
            <Col xs={{ span: 9 }}>
              <Row className={"mb-1"}>
                <StyledTitle variant={variant} className={"text-weight-bold"}>
                  {article?.data?.title}
                </StyledTitle>
              </Row>
              <Row>
                <StyledDescription className={"text-muted"}>
                  {`${article?.data?.description?.substring(0, 50)} ...`}
                </StyledDescription>
              </Row>
              {userData.profileData.id === article.creatorId && (
                <Row>
                  <EditButtons
                    article={article}
                    handleShowEditArticle={handleShowEditArticle}
                    handleShowDeleteItem={handleShowDeleteItem}
                  />
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 1.2em 0px;
`;

const StyledTitle = styled.div`
  font-size: 0.8em;
  padding: 0 0 0.3em;
`;

const StyledDescription = styled.div`
  font-size: 0.75em;
`;

export default ArticleLine;

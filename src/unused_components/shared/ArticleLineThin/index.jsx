import React from "react";
import { Row, Col } from "react-bootstrap";
import Source from "../Source";
import "../../../main.css";
import DateBlock from "./dateBlock";
import styled from "styled-components";

const ArticleLineThin = ({ article, parentTag = {} }) => {
  return (
    <>
      <Row className={"pt-3 pb-3"}>
        <Col
          xs={{ span: 4 }}
          lg={{ span: 4 }}
          style={{ borderRight: "2px solid #ccc" }}
          className={"m-0 pb-2"}
        >
          <DateBlock
            datestring={article?.itemDate}
            time={article.data}
            articleid={article?.id}
          />
        </Col>
        <Col xs={{ span: 8 }} lg={{ span: 8 }}>
          <Row>
            <Col xs={{ span: 10 }} md={{ span: 10 }}>
              <StyledTitle>{article?.data?.title}</StyledTitle>
            </Col>
            <Col className={"right-text"} xs={{ span: 2 }} md={{ span: 2 }}>
              <Source source={article?.data?.source || article?.source} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const StyledTitle = styled.div`
  font-size: 0.8em;
`;

export default ArticleLineThin;

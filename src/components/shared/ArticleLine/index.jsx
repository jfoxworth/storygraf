import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsFillTrashFill, BsGear } from "react-icons/bs";
import Source from "../Source";
import "../../../main.css";
import DateBlock from "./dateBlock";
import Cumulative from "../Cumulative";
import styled from "styled-components";
import { deleteItem } from "../utils/api/item";

const ArticleLine = ({ article, parentTag = {}, variant = "left" }) => {
  let artData =
    typeof article.data === "string" ? JSON.parse(article.data) : article.data;

  const deleteThisArticle = (parentTagId, articleId) => {
    deleteItem(parentTagId, articleId, "ARTICLE");
  };

  const matchTagColor = (tag, cumItem) => {
    let badgeColor = "#CCCCCC";
    tag?.data?.cumulatives?.forEach((cum) => {
      if (cum.text === cumItem.text) {
        badgeColor = cum.color;
      }
    });
    return badgeColor;
  };

  return (
    <StyledWrapper>
      <Row>
        <Col xs={{ span: 5, order: 1 }} lg={{ span: 5, order: 1 }}>
          <StyledPoints>
            <ul>
              {article.data?.userPoints?.map((kp, i) => (
                <li key={`keypoint${i}`}>{kp}</li>
              ))}
            </ul>
          </StyledPoints>
        </Col>
        <Col xs={{ span: 2, order: 2 }} lg={{ span: 2, order: 2 }}>
          <DateBlock
            datestring={article?.itemDate}
            time={artData}
            articleid={article?.id}
          />
        </Col>
        <Col xs={{ span: 5, order: 3 }}>
          <Row>
            <Col xs={{ span: 9, order: 1 }}>
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
            </Col>
            <Col xs={{ span: 3, order: 2 }}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: "url(" + article?.data?.image?.url + ")",
                  height: "80px",
                  backgroundSize: "cover",
                  borderRadius: "0px 15px 15px 0px",
                  padding: 0,
                }}
              >
                <Source source={article?.data?.source || article?.source} />
              </div>
            </Col>
          </Row>
          {article.data?.cumulatives?.length > 0 && (
            <Row className={"my-3"}>
              <Col>
                {article.data?.cumulatives?.map((cumItem, i) => (
                  <Cumulative
                    key={`cumulative${i}`}
                    cumItem={{
                      ...cumItem,
                      color: matchTagColor(parentTag, cumItem),
                    }}
                  />
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-top: 1px solid #ddd;
  border-radius: 0px 15px 15px 0px;
  padding: 5px 0px;
`;

const StyledPoints = styled.div`
  font-size: 0.75em;
`;

const StyledTitle = styled.div`
  font-size: 0.75em;
`;

const StyledDescription = styled.div`
  font-size: 0.75em;
`;

export default ArticleLine;

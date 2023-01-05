import React from "react";
import { Row, Col } from "react-bootstrap";
import Source from "../Source";
import "../../../main.css";
import DateBlock from "./dateBlock";
import Cumulative from "../Cumulative";
import styled from "styled-components";

const ArticleLine = ({ article, parentTag = {}, variant = "normal" }) => {
  let artData =
    typeof article.data === "string" ? JSON.parse(article.data) : article.data;

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
    <>
      <Row>
        <Col
          xs={{ span: 5 }}
          lg={{ span: 4 }}
          style={{ borderRight: "2px solid #ccc" }}
          className={"m-0 pb-2"}
        >
          <DateBlock
            datestring={article?.itemDate}
            time={artData}
            articleid={article?.id}
          />
          <div className={"mt-3 text-muted"}>
            <ul>
              {article.data?.userPoints?.map((kp, i) => (
                <li key={`keypoint${i}`}>
                  <div className={"text-muted"} style={{ fontSize: "0.7em" }}>
                    {kp}
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
        <Col xs={{ span: 7 }} lg={{ span: 8 }} className={"pb-3"}>
          <Row className={"mb-3 mx-3"}>
            <Col xs={{ span: 4 }} lg={{ span: 4 }}>
              <div
                style={{
                  minWidth: variant === "small" ? "50px" : "100px",
                  backgroundImage: "url(" + article?.data?.image?.url + ")",
                  minHeight: variant === "small" ? "50px" : "100px",
                  backgroundSize: "cover",
                  borderRadius: "5px 5px 5px 5px",
                }}
              ></div>
            </Col>

            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              <Row className={"mb-3"}>
                <Col xs={{ span: 10 }} md={{ span: 10 }}>
                  <StyledTitle variant={variant} className={"text-weight-bold"}>
                    {article?.data?.title}
                  </StyledTitle>
                </Col>
                <Col className={"right-text"} xs={{ span: 2 }} md={{ span: 2 }}>
                  <Source source={article?.data?.source || article?.source} />
                </Col>
              </Row>
              <Row>
                <StyledDescription className={"text-muted"}>
                  {article?.data?.userDescription
                    ? article.data.userDescription
                    : article?.data?.description}
                </StyledDescription>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const StyledTitle = styled.div`
  font-size: ${(props) => (props.variant === "small" ? "0.6em" : "0.75em")};
`;

const StyledDescription = styled.div`
  font-size: ${(props) => (props.variant === "small" ? "0.5em" : "0.6em")};
`;

export default ArticleLine;

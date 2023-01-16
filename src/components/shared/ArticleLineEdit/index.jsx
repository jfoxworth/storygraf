import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsFillTrashFill, BsGear } from "react-icons/bs";
import Source from "../Source";
import "../../../main.css";
import DateBlock from "./dateBlock";
import Cumulative from "../Cumulative";
import styled from "styled-components";
import { useUser } from "../../Contexts/UserContext";
import { deleteItem } from "../utils/api/item";

const ArticleLine = ({
  article,
  parentTag = {},
  variant = "left",
  handleShowEditArticle,
  handleShowDeleteItem,
}) => {
  const userData = useUser();

  let artData =
    typeof article.data === "string" ? JSON.parse(article.data) : article.data;

  const deleteThisArticle = (article) => {
    handleShowDeleteItem(true, article);
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
        <Col xs={{ span: 4, order: 1 }} lg={{ span: 4, order: 1 }}>
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
        <Col xs={{ span: 6, order: 3 }}>
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
                <div className={"p-2 d-flex justify-content-between"}>
                  <Button
                    variant="outline-secondary"
                    className="icon-button px-0 py-1 ml-5"
                    style={{
                      fontSize: "0.8em",
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => deleteThisArticle(article)}
                  >
                    <BsFillTrashFill />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="icon-button px-0 py-1 ml-5"
                    style={{
                      fontSize: "0.8em",
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => handleShowEditArticle(true, article)}
                  >
                    <BsGear />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <StyledDivider />
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

const StyledDivider = styled.div`
  height: 2px;
  background: #3a5199;
`;

export default ArticleLine;

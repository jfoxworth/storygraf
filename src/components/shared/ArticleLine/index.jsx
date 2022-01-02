import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Source from "../Source";
import "../../../main.css";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteArticle } from "../../../graphql/mutations";
import { API } from "aws-amplify";

const ArticleLine = ({ article, showDelete = false }) => {
  const [as, setAs] = useState(true);
  let dayWritten = new Date(article.dateWritten);
  dayWritten.setDate(dayWritten.getDate() + 1);
  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const deleteThisArticle = async (id) => {
    return await API.graphql({
      query: deleteArticle,
      variables: { input: { id: id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then(setAs(false));
  };

  return (
    <>
      {as && (
        <Row className="mb-3 ">
          <Col xs={{ span: 2 }}>{`${
            monthArr[dayWritten.getMonth()]
          } ${dayWritten.getDate()} ${dayWritten.getFullYear()}`}</Col>
          <Col xs={{ span: 2 }}>
            <Source source={article.source} />
          </Col>
          <Col xs={{ span: 8 }}>
            {article.title}
            {showDelete && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => deleteThisArticle(article.id)}
              >
                <BsFillTrashFill />
              </div>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ArticleLine;

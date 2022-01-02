import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Source from "../Source";
import "../../../main.css";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteArticle } from "../../../graphql/mutations";
import { API } from "aws-amplify";
import DateBlock from "./dateBlock";

const ArticleLine = ({ article, showDelete = false }) => {
  const [as, setAs] = useState(true);
  let artData = JSON.parse(article.data);

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
          <Col xs={{ span: 2 }}>
            <DateBlock datestring={article.dateWritten} time={artData} />
          </Col>
          <Col xs={{ span: 1 }}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <Source source={article.source} />
            </a>
          </Col>
          <Col xs={{ span: 9 }} style={{ "font-size": "0.9em" }}>
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

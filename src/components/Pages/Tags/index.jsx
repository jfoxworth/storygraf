import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { listTagRelations } from "../../../graphql/queries";
import TagGrid from "./TagGrid";
import TagChildren from "../../shared/TagChildren";

const Tags = () => {
  let [userData, setUserData] = useState({});
  let [tagRelData, setTagRelData] = useState([]);

  const unstringData = (items) => {
    items.forEach((item) => {
      item.childTag.data = JSON.parse(item.childTag.data);
    });
    return items;
  };

  const getTags = async (event) => {
    await API.graphql({
      query: listTagRelations,
      filter: { parentId: { eq: 0 } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setTagRelData(unstringData(data.data.listTagRelations.items));
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
      getTags();
    });
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h1 className="accent-bottom text-center mb-3 pb-3">Tags</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                The tags below are the current top level tags. Click on any tag
                to see its articles and descendents
              </p>
            </Col>
          </Row>
          <Row className={"mt-5"}>
            <TagChildren tag={{ id: 0 }} setNumChildren={() => {}} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Tags;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { listTagRelations } from "../../graphql/queries";
import TagWaterfall from "../shared/TagWaterFall";

const TagsPage = () => {
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
    }).then((data) =>
      setTagRelData(unstringData(data.data.listTagRelations.items))
    );
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
        <Col>
          <h2 className="accent-bottom mb-3 pb-3">User Tags</h2>
        </Col>
      </Row>
      <Row className={"mt-5"}>
        {tagRelData.map((tagRel) => (
          <TagWaterfall
            tag={tagRel.childTag}
            handleCreateTagClick={() => {}}
            handleCreateArticleClick={() => {}}
          />
        ))}
      </Row>
    </Container>
  );
};

export default TagsPage;

import React, { useState, useEffect } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { listTagRelations } from "../../../graphql/queries";
import { API } from "aws-amplify";
import Tag from "../../shared/Tag";

import { BsFillBookmarkPlusFill } from "react-icons/bs";

const TagList = ({ parentId, userData }) => {
  const unstringData = (items) => {
    items.forEach((item) => {
      item.childTag.data = JSON.parse(item.childTag.data);
    });
    return items;
  };

  let [tagData, setTagData] = useState([]);

  const getTags = async (event) => {
    await API.graphql({
      query: listTagRelations,
      filter: { parentId: { eq: parentId } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) =>
      setTagData(unstringData(data.data.listTagRelations.items))
    );
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <Container>
        <ListGroup>
          {tagData.map((item) => (
            <ListGroup.Item key={`${item.childTag.id}`}>
              <Row>
                <Col>
                  <Tag type={item.childTag.type} text={item.childTag.name} />
                </Col>
                <Col>{userData.username && <BsFillBookmarkPlusFill />}</Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>{" "}
      </Container>
    </>
  );
};

export default TagList;

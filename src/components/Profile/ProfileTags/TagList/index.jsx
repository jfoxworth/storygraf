import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { listTagRelations } from "../../../../graphql/queries";
import { API } from "aws-amplify";
import Tag from "../../../shared/Tag";

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
    <Container>
      {tagData.map((item) => (
        <div key={`${item.childTag.id}`}>
          <Row className="mt-3">
            <Col>
              <Tag tag={item.childTag} />
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default TagList;

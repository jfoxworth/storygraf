import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { listTagRelations } from "../../../graphql/queries";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";

const TagList = ({ parentId }) => {
  let [tagData, setTagData] = useState([]);

  const getTags = async (event) => {
    await API.graphql({
      query: listTagRelations,
      variables: { filter: { parentId: { eq: parentId } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => setTagData(data.data.listTagRelations.items));
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <Container>
        <div>Tag list - {tagData.length}</div>
      </Container>
    </>
  );
};

export default TagList;

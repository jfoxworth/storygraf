import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { listTagRelations } from "../../../graphql/queries";
import { API } from "aws-amplify";
import Tag from "../Tag";

const TagWaterfall = ({ tag }) => {
  const [childData, setChildData] = useState([]);

  const ChildTag = ({ tag }) => {
    return (
      <Row>
        <Tag className="list-group-item" key={`childtag-${tag.id}`} />
      </Row>
    );
  };

  const getTagChildren = async (id) => {
    await API.graphql({
      query: listTagRelations,
      variables: { filter: { parentId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      console.log(data);
      setChildData(data.data.listTagRelations.items);
    });
  };

  useEffect(() => {
    getTagChildren(tag.id);
  }, [tag.id]);

  return (
    <div className="mx-5">
      <Tag tag={tag} />

      {childData.map((tagRel) => (
        <TagWaterfall tag={tagRel.childTag} />
      ))}
    </div>
  );
};

export default TagWaterfall;

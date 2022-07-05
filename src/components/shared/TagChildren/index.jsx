import React, { useState, useEffect } from "react";
import { listTagRelations } from "../../../graphql/queries";
import { Row, Col } from "react-bootstrap";
import { API } from "aws-amplify";
import Tag from "../Tag";

const TagChildren = ({ tag, setNumChildren = () => {} }) => {
  const [childData, setChildData] = useState([]);

  const getTagChildren = async (id) => {
    await API.graphql({
      query: listTagRelations,
      variables: { filter: { parentId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let childArray = [];
      data.data.listTagRelations.items.forEach((child) => {
        childArray.push({
          ...child.childTag,
          data: JSON.parse(child.childTag.data),
        });
      });
      console.log(childArray);
      setChildData(childArray);
      setNumChildren(data.data.listTagRelations.items.length);
    });
  };

  useEffect(() => {
    getTagChildren(tag.id);
  }, [tag.id]);

  return (
    <div className="pt-3">
      {childData.length > 0 &&
        childData.map((tagRel, j) => {
          return (
            <Row key={`childtag${j}`} className={"mb-3"}>
              <Col xs={{ span: 6 }} md={{ span: 4 }}>
                <div style={{ display: "inline-block" }}>
                  <Tag tag={tagRel} />
                </div>
              </Col>
              <Col xs={{ span: 6 }} md={{ span: 8 }}>
                <div
                  className={"text-muted"}
                  style={{ display: "inline-block" }}
                >
                  {tagRel.data.description}
                </div>
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

export default TagChildren;

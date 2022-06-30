import React, { useState, useEffect } from "react";
import { listTagRelations } from "../../../graphql/queries";
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
      setChildData(data.data.listTagRelations.items);
      setNumChildren(data.data.listTagRelations.items.length);
    });
  };

  useEffect(() => {
    getTagChildren(tag.id);
  }, [tag.id]);

  return (
    <div className="pt-3">
      {childData.length > 0 &&
        childData.map((tagRel, j) => <Tag key={j} tag={tagRel.childTag} />)}
    </div>
  );
};

export default TagChildren;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { listTagRelations, listArticles } from "../../../graphql/queries";
import { API } from "aws-amplify";
import Tag from "../Tag";
import ArticleLine from "../ArticleLine";

const TagWaterfall = ({
  tag,
  handleCreateTagClick,
  handleCreateArticleClick,
}) => {
  const [childData, setChildData] = useState([]);
  const [articleData, setArticleData] = useState([]);

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

  const getTagArticles = async (id) => {
    await API.graphql({
      query: listArticles,
      variables: { filter: { tagId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setArticleData(data.data.listArticles.items);
    });
  };

  useEffect(() => {
    getTagChildren(tag.id);
    getTagArticles(tag.id);
  }, [tag.id]);

  return (
    <div className="ml-xlarge pt-3 border-left">
      <Tag
        tag={tag}
        handleCreateTagClick={handleCreateTagClick}
        handleCreateArticleClick={handleCreateArticleClick}
        showAdds={true}
      />

      {articleData.map((article, i) => (
        <ArticleLine article={article} />
      ))}

      {childData.map((tagRel) => (
        <TagWaterfall
          tag={tagRel.childTag}
          handleCreateTagClick={handleCreateTagClick}
          handleCreateArticleClick={handleCreateArticleClick}
        />
      ))}
    </div>
  );
};

export default TagWaterfall;

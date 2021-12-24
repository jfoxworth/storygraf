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
  showArticles,
  showAdds,
}) => {
  const [childData, setChildData] = useState([]);
  const [articleData, setArticleData] = useState([]);

  console.log("The show adds is ");
  console.log(showAdds);

  const getTagChildren = async (id) => {
    await API.graphql({
      query: listTagRelations,
      variables: { filter: { parentId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      console.log("The tag children in tag waterfall");
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
    showArticles && getTagArticles(tag.id);
  }, [tag.id]);

  return (
    <div className="ml-xlarge pt-3 border-left">
      {tag.id && (
        <Tag
          tag={tag}
          handleCreateTagClick={handleCreateTagClick}
          handleCreateArticleClick={handleCreateArticleClick}
          showAdds={showAdds}
        />
      )}

      {showArticles &&
        articleData.map((article, i) => <ArticleLine article={article} />)}

      {childData.map((tagRel) => (
        <TagWaterfall
          showArticles={showArticles}
          tag={tagRel.childTag}
          showAdds={showAdds}
          handleCreateTagClick={handleCreateTagClick}
          handleCreateArticleClick={handleCreateArticleClick}
        />
      ))}
    </div>
  );
};

export default TagWaterfall;

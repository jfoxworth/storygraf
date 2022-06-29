import React, { useState, useEffect } from "react";
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
  showDelete,
}) => {
  const [childData, setChildData] = useState([]);
  const [articleData, setArticleData] = useState([]);

  const getTagChildren = async (id) => {
    await API.graphql({
      query: listTagRelations,
      variables: { filter: { parentId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
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
    <>
      <div className="pt-3">
        {tag.id && (
          <Tag
            tag={tag}
            handleCreateTagClick={handleCreateTagClick}
            handleCreateArticleClick={handleCreateArticleClick}
            showAdds={showAdds}
          />
        )}
      </div>

      <div className="ml-xlarge pt-3 border-left">
        {showArticles &&
          articleData.map((article, i) => (
            <ArticleLine
              article={article}
              key={`${i}${article.id}`}
              showAdds={showAdds}
              showDelete={showDelete | false}
            />
          ))}

        {childData.map((tagRel, j) => (
          <TagWaterfall
            showArticles={showArticles}
            tag={tagRel.childTag}
            showAdds={showAdds}
            handleCreateTagClick={handleCreateTagClick}
            handleCreateArticleClick={handleCreateArticleClick}
            key={`${j}${tagRel.id}`}
          />
        ))}
      </div>
    </>
  );
};

export default TagWaterfall;
